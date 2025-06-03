import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PuntajesService {
  private supabase = createClient(
    environment.supabaseUrl,
    environment.supabaseAnonKey
  );

  // Guarda un puntaje de ahorcado
  async guardarPuntajeAhorcado(usuario: string, puntaje: number) {
    const { data, error } = await this.supabase
      .from('puntajes_ahorcado')
      .insert([
        {
          usuario: usuario,
          puntaje: puntaje,
          fecha: new Date()
        }
      ]);
    if (error) {
      throw error;
    }
    return data;
  }
  async guardarPuntajeMayorOmenor(usuario: string, puntaje: number) {
    const { data, error } = await this.supabase
      .from('puntajes_mayoromenor')
      .insert([
        {
          usuario: usuario,
          puntaje: puntaje,
          fecha: new Date()
        }
      ]);
    if (error) {
      throw error;
    }
    return data;
  }
  async guardarPuntajePreguntados(usuario: string, puntaje: number) {
    const { data, error } = await this.supabase
      .from('puntajes_preguntados')
      .insert([
        {
          usuario: usuario,
          puntaje: puntaje,
          fecha: new Date()
        }
      ]);
    if (error) {
      throw error;
    }
    return data;
  }
  async guardarPuntajeEmoji(usuario: string, puntaje: number) {
    const { data, error } = await this.supabase
      .from('puntajes_emoji')
      .insert([
        {
          usuario: usuario,
          puntaje: puntaje,
          fecha: new Date()
        }
      ]);
    if (error) {
      throw error;
    }
    return data;
  }
  
  async traerTopAhorcado(limit = 10) {
    const { data, error } = await this.supabase
      .from('puntajes_ahorcado')
      .select('usuario, puntaje')
      .order('puntaje', { ascending: false })
      .limit(limit);
  
    if (error) throw error;
    return data || [];
  }
  // Para mayor o menor
  async traerTopMayorMenor(limit = 10) {
    const { data, error } = await this.supabase
      .from('puntajes_mayoromenor')
      .select('usuario, puntaje')
      .order('puntaje', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  }

  // Para preguntados
  async traerTopPreguntados(limit = 10) {
    const { data, error } = await this.supabase
      .from('puntajes_preguntados')
      .select('usuario, puntaje')
      .order('puntaje', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  }

  // Para emoji diferente
  async traerTopEmojiDiferente(limit = 10) {
    const { data, error } = await this.supabase
      .from('puntajes_emoji')
      .select('usuario, puntaje')
      .order('puntaje', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  }

  
}
