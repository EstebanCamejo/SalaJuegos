import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  private supabase = createClient(
    environment.supabaseUrl,
    environment.supabaseAnonKey
  );

  async guardarEncuesta(encuesta: any) {
    const { data, error } = await this.supabase
      .from('encuestas')
      .insert([
        {
          ...encuesta,
          fecha: new Date()
        }
      ]);
    if (error) throw error;
    return data;
  }
}
