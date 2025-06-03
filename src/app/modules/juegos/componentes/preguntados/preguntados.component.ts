import { Component, OnInit } from '@angular/core';
import { PreguntadosService } from '../../../../services/preguntados.service';
import { AuthService } from '../../../../auth.service';
import { PuntajesService } from '../../../../services/puntajes.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css',
  standalone: false
})
export class PreguntadosComponent implements OnInit {

  imagenPersonaje: string = '';
  opciones: string[] = [];
  respuestaCorrecta: string = '';

  aciertos: number = 0;
  errores: number = 0;
  maxErrores: number = 3;
  puntaje: number = 0;
  mensajeFinal: string = '';
  juegoTerminado: boolean = false;

  //usuarioEmail: string = '';
  personajesUtilizados: string[] = [];
  mostrarAvisoLogin: boolean = false;

  constructor(
    private preguntadosService: PreguntadosService, 
    private authService: AuthService,
    private puntajesService: PuntajesService) { }

  ngOnInit(): void {
    // const usuario = this.authService.getUsuarioActualValue();
    // if (usuario) {
    //   this.usuarioEmail = usuario.email;
    // }
    this.nuevaPregunta();
    this.mostrarAvisoLogin = !this.usuarioLogueado();
  }

   /**
   * Chequea si hay usuario logueado.
   */
   usuarioLogueado(): boolean {
    const usuario = this.authService.getUsuarioActualValue();
    return !!usuario && usuario !== 'anónimo';
  }

    /**
   * Pide una nueva pregunta a la API y la carga en pantalla.
   * Evita repetir personaje.
   */
  nuevaPregunta() {
    this.preguntadosService.obtenerPregunta().subscribe(pregunta => {
      // Evitar repetir personaje correcto
      if (this.personajesUtilizados.includes(pregunta.correcta)) {
        this.nuevaPregunta(); // Reintenta con otro
        return;
      }
      this.personajesUtilizados.push(pregunta.correcta);
      this.imagenPersonaje = pregunta.imagen;
      this.opciones = pregunta.opciones;
      this.respuestaCorrecta = pregunta.correcta;
    });
  }
  
   /**
   * Lógica para elegir una respuesta.
   */
  elegirRespuesta(respuesta: string) {
    if (this.juegoTerminado) return;

    if (respuesta === this.respuestaCorrecta) {
      this.aciertos++;
    } else {
      this.errores++;
    }

    if (this.aciertos === 10) {
      this.finalizarJuego(true);
    } else if (this.errores >= this.maxErrores) {
      this.finalizarJuego(false);
    } else {
      this.nuevaPregunta();
    }
  }

   /**
   * Termina la partida, calcula el puntaje y (si corresponde) lo guarda.
   * true si el usuario ganó la partida
   */
  finalizarJuego(gano: boolean) {
    this.juegoTerminado = true;

    if (gano && this.errores === 0) {
      this.puntaje = 100;
      this.mensajeFinal = '¡Ganaste con puntaje perfecto! 🎉';
    } else if (gano) {
      this.puntaje = 100 - (this.errores * 10);
      this.mensajeFinal = `¡Ganaste con ${this.puntaje} puntos!`;
    } else {
      this.puntaje = 0;
      this.mensajeFinal = '😢 Perdiste todas tus vidas. Puntaje: 0';
    }

    this.registrarPuntaje();
  }
  
  /**
   * Resetea el estado para una nueva partida.
   */
  reiniciarJuego() {
    this.aciertos = 0;
    this.errores = 0;
    this.puntaje = 0;
    this.mensajeFinal = '';
    this.juegoTerminado = false;
    this.personajesUtilizados = [];
    this.nuevaPregunta();
  }

  /**
   * Guarda el puntaje en Supabase si el usuario está logueado.
   * Si no, muestra un aviso para registrarse/loguearse.
   */
  registrarPuntaje() {
    const usuarioObj = this.authService.getUsuarioActualValue();
    const usuario = typeof usuarioObj === 'string' ? usuarioObj : usuarioObj?.email || 'anónimo';
  
    if (!usuario || usuario === 'anónimo') {
      this.mostrarAvisoLogin = true;
      return;
    }
    
    this.puntajesService.guardarPuntajePreguntados(usuario, this.puntaje)
      .then(() => {
        this.mensajeFinal += "\n\n¡Puntaje guardado en el ranking!";
      })
      .catch(() => {
        this.mensajeFinal += "\n\n(No se pudo guardar el puntaje)";
      });
  }
  
}
