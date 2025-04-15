import { Injectable, signal } from "@angular/core";
import { AuthResponse, createClient, SupabaseClient } from "@supabase/supabase-js";
import { environment } from "../environments/environment.development";
import { from, Observable } from "rxjs";


@Injectable({
providedIn: 'root',
})
export class AuthService {
    /*
    supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
    currentUser = signal <{email: string; username: string} | null> (null);

    register(email: string, password: string, username: string): Observable<AuthResponse> {
        const promise = this.supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    username,
                },
            },
        });
        return from(promise);
    }

    login(email: string, password: string): Observable<AuthResponse> {
        const promise = this.supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        return from(promise);
    }

    logout(): void {
        this.supabase.auth.signOut();
    }*/ 


    private supabase: SupabaseClient;

    constructor() {
        // Inicializa el cliente Supabase con URL y clave publica
        this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
    }

     // Iniciar sesión con correo y contraseña
    iniciarSesion(correo: string, contrasena: string) {
        return this.supabase.auth.signInWithPassword({
        email: correo,
        password: contrasena
        });
    }

    // Registrar un nuevo usuario
    registrarUsuario(correo: string, contrasena: string) {
        return this.supabase.auth.signUp({
            email: correo,
            password: contrasena
        });
    }

    // Cerrar sesión del usuario actual
    cerrarSesion() {
       return this.supabase.auth.signOut();
    }
    
    // Obtener información del usuario autenticado
    obtenerUsuarioActual() {
       return this.supabase.auth.getUser();
    }
    
        
}