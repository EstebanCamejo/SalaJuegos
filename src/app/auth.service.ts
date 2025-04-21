import { Injectable, signal } from "@angular/core";
import { AuthResponse, createClient, SupabaseClient } from "@supabase/supabase-js";
import { environment } from "../environments/environment.development";
import { from, Observable } from "rxjs";
import { BehaviorSubject } from 'rxjs';



@Injectable({
providedIn: 'root',
})
export class AuthService {    

    public usuarioActual = new BehaviorSubject<any>(null);

    private supabase: SupabaseClient;

    constructor() {
        // Inicializa el cliente Supabase con URL y clave publica
        this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);

        this.supabase.auth.getUser().then(({ data }) => {
          if (data?.user) {
            this.usuarioActual.next(data.user);
          }
        });
    }

     // Iniciar sesión con correo y contraseña
     iniciarSesion(correo: string, contrasena: string) {
      return this.supabase.auth.signInWithPassword({ 
        email: correo, 
        password: contrasena
      }).then((res)=>
        {
          if(res.data.user){
            this.usuarioActual.next(res.data.user);
          } // Actualiza el estado del usuario actual          
          return res;
        });        
    };
          

    // Registrar un nuevo usuario
    registrarUsuario(correo: string, contrasena: string) {
      return this.supabase.auth.signUp({ 
        email: correo, 
        password: contrasena
      }).then((res) => {
        if(res.data.user){
          this.usuarioActual.next(res.data.user); // Actualiza el estado del usuario actual
        } // Actualiza el estado del usuario actual 
        return res;
      });
    };      

    // Cerrar sesión del usuario actual
    logOut() {
       return this.supabase.auth.signOut().then(() => {        
            this.usuarioActual.next(null); // Actualiza el estado del usuario actual a null   
        });
    }
    
    // Obtener información del usuario autenticado
    getUsuarioActual() {
       return this.supabase.auth.getUser();
    }
    
        
}