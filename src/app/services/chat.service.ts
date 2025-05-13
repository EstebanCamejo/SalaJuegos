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

  async obtenerMensajes() {
    const { data, error } = await this.supabase
      .from('mensajes')
      .select('*')
      .order('created_at', { ascending: true });
    if (error) throw error;
    return data;
  }

  async enviarMensaje(usuario: string, texto: string) {
    const { data, error } = await this.supabase.from('mensajes').insert([{ usuario, contenido: texto }]);
    if (error) {
      console.error('Error al enviar mensaje:', error);
      throw error;
    }
    return data;
  }



  suscribirseMensajes(callback: (nuevoMensaje: any, evento: string) => void) {
    const canal = this.supabase
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

  cerrarSuscripcion(canal: any) {
    this.supabase.removeChannel(canal);
  }
  
    
}
