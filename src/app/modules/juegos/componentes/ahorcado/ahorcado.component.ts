import { Component } from '@angular/core';
import { AuthService } from '../../../../auth.service';
import {PuntajesService } from '../../../../services/puntajes.service';

@Component({
  selector: 'app-ahorcado',
  standalone: false,
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css',
})
export class AhorcadoComponent {
  
  alfabeto: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  palabraOculta: string = '';
  letrasIngresadas: string[] = [];
  errores: number = 0;
  maxErrores: number = 6;
  palabraMostrada: string[] = [];
  //usuarioEmail: string = '';
  partidaFinalizada: boolean = false;
  gano: boolean = false;

  //puntajes: any[] = [];
  mensaje: string = '';  
  mensajeExito: string = '';
  mensajeError: string = '';
  mostrarAvisoLogin: boolean = false;

  imagenesAhorcado: string[] = [
    'assets/ahorcado1.png',
    'assets/ahorcado2.png',
    'assets/ahorcado3.png',
    'assets/ahorcado4.png', 
    'assets/ahorcado5.png',
    'assets/ahorcado6.png',
    'assets/ahorcado7.png',
  ];

  palabras: string[] = [
    'ANGULAR', 
    'CODIGO', 
    'COMPILAR', 
    'COMPONENTE', 
    'CSS', 
    'ESTILOS', 
    'FIREBASE', 
    'FUNCION', 
    'GIT', 
    'GITHUB', 
    'HTML', 
    'INYECCION', 
    'MODULO', 
    'PROYECTO', 
    'REACTIVO', 
    'RUTEO', 
    'SISTEMA', 
    'SUPABASE', 
    'TYPESCRIPT', 
    'VARIABLE'
  ];

  constructor(private authService: AuthService, private  puntajesService: PuntajesService) {}

  ngOnInit(): void {
    this.reiniciarJuego(); 
    this.mostrarAvisoLogin = !this.usuarioLogueado();
  }

  /**
   * Devuelve true si hay usuario logueado, false si es anónimo.
   */
  usuarioLogueado(): boolean {
    const usuario = this.authService.getUsuarioActualValue();
    return !!usuario && usuario !== 'anónimo';
  }
  
  /**
   * Selecciona una palabra aleatoria y resetea el estado del juego.
   */
  obtenerPalabra() {
    const randomIndex = Math.floor(Math.random() * this.palabras.length);
    this.palabraOculta = this.palabras[randomIndex];
    this.palabraMostrada = Array(this.palabraOculta.length).fill('_');
  }

  /**
   * Devuelve la imagen correspondiente según la cantidad de errores.
   */
  getImagenAhorcado(): string {
    return this.imagenesAhorcado[Math.min(this.errores, this.imagenesAhorcado.length - 1)];
  }

  /**
   * Lógica principal para arriesgar una letra.
   */
  arriesgarLetra(letra: string) {
    if (this.partidaFinalizada || this.letrasIngresadas.includes(letra)) return;
    
    this.letrasIngresadas.push(letra);
  
    let letraAcertada = false;
    for (let i = 0; i < this.palabraOculta.length; i++) {
      if (this.palabraOculta[i].toUpperCase() === letra.toUpperCase()) {
        this.palabraMostrada[i] = this.palabraOculta[i];
        letraAcertada = true;
      }
    }
  
    if (!letraAcertada) {
      this.errores++;
    }

    //Victoria
    if(!this.palabraMostrada.includes('_')) {
      this.registrarPuntaje(true);
      this.mensaje = '¡Ganaste! 🎉 La palabra era: ' + this.palabraOculta;
      this.partidaFinalizada = true;
      this.gano = true; 
      
    }
  
    //Derrota
    if (this.errores >= this.maxErrores) {
        this.registrarPuntaje(false);        
        this.mensaje = '😢 ¡Perdiste! La palabra era: ' + this.palabraOculta;
        this.partidaFinalizada = true;       
        this.gano = false;        
      }
  }

   /**
   * Reinicia el juego a estado inicial.
   */
  reiniciarJuego() {
    this.letrasIngresadas = [];
    this.errores = 0;
    this.partidaFinalizada = false;
    this.mensaje = '';
    this.gano = false;
    this.obtenerPalabra();
  }

 /**
   * Guarda el puntaje solo si el usuario está logueado.
   * Si no, muestra un aviso para registrarse/loguearse.
   */
  registrarPuntaje(gano: boolean) {   
    const usuarioObj = this.authService.getUsuarioActualValue();
    const usuario = typeof usuarioObj === 'string' ? usuarioObj : usuarioObj?.email || 'anónimo';
    
    // Solo guardar si NO es "anónimo"
    if (!usuario || usuario === 'anónimo') {
      this.mostrarAvisoLogin = true;
      return;
    }

    const puntaje = Math.max(100 - (this.errores * 10), 0);
    // Guardamos el puntaje en Supabase
    this.puntajesService.guardarPuntajeAhorcado(usuario, puntaje)
      .then(() => {       
        this.mensajeExito = "¡Tu puntaje fue guardado con éxito!";  // creá mensajeExito en el TS y mostralo en el HTML
        this.mensajeError = '';
      })
      .catch(() => {
        // Mostrar error en pantalla (no en consola ni alert)
        this.mensajeError = "No se pudo guardar el puntaje. Intenta de nuevo más tarde.";
        this.mensajeExito = '';
      });
  }
  
  /**
   * Getter para mostrar el puntaje actual.
   */
  get puntajeActual(): number {
    return Math.max(100 - (this.errores * 10), 0);
  }
  
}