import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }
  //obtener mensajes de supabase
  async obtenerMensajes() {
    const { data, error } = await this.supabase
      .from('mensajes')
      .select('*')
      .order('created_at', { ascending: true }); // ordenarlos por fecha de creación
    if (error) throw error;
    return data;
  }

 // Enviar un mensaje a la base de datos
  async enviarMensaje(usuario: string, texto: string) {
    const { data, error } = await this.supabase.from('mensajes').insert([{ usuario, contenido: texto }]);
    if (error) {
      console.error('Error al enviar mensaje:', error);
      throw error;
    }
    return data;
  }


  // Actualizar un mensaje en la base de datos
  suscribirseMensajes(callback: (nuevoMensaje: any, evento: string) => void) {
    const canal = this.supabase
    // Crear un canal para escuchar cambios en la tabla 'mensajes'
      .channel('mensajes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'mensajes' },
        payload => {
          callback(payload.new, 'INSERT');
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'mensajes' },
        payload => {
          callback(payload.new, 'UPDATE');
        }
      )
      .subscribe();

    return canal;
  }
  // Elimina el canal de suscripción de Supabase, terminando la escucha de nuevos mensajes.
  cerrarSuscripcion(canal: any) {
    this.supabase.removeChannel(canal);
  }
  
    
}
