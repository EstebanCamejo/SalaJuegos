// mayor-o-menor.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartasService } from '../../../../services/cartas.service';
import { AuthService } from '../../../../../app/auth.service';
import { PuntajesService } from '../../../../services/puntajes.service';


@Component({
  selector: 'app-mayor-o-menor', 
  standalone: false,
  templateUrl: './mayor-o-menor.component.html',
  styleUrl: './mayor-o-menor.component.css'
})
export class MayorOMenorComponent implements OnInit, OnDestroy {
  
  cartaActual: any = null;
  cartaSiguiente: any = null;
  puntaje: number = 0;
  mazoId: string = '';
  finalizado = false;
  esCorrecto = false;
  mensaje = '';
  fallos = 0;
  puntajeMaximo = 5;
  fallosMaximos = 3;
  mostrarAvisoLogin: boolean = false; // Para el mensaje de login/registro

  constructor(
    private cartasService: CartasService, 
    private authService: AuthService,
    private puntajesService: PuntajesService) {}


  ngOnInit(): void {
    this.inicializarJuego();
    this.mostrarAvisoLogin = !this.usuarioLogueado();
  }

  ngOnDestroy(): void {}

  /**
   * Chequea si hay usuario logueado.
   */
  usuarioLogueado(): boolean {
    const usuario = this.authService.getUsuarioActualValue();
    return !!usuario && usuario !== 'anónimo';
  }

  /**
   * Inicializa el mazo y el estado inicial del juego.
   */
  inicializarJuego() {
    this.cartasService.obtenerMazo().subscribe(res => {
      this.mazoId = res.deck_id;
      this.cartasService.obtenerCarta(this.mazoId).subscribe(res => {        
        this.cartaActual = res.cards[0];        
        this.finalizado = false;
        this.puntaje = 0;
        this.fallos = 0;
        this.mensaje = '';
        this.cartaSiguiente = null;
      });
    });
  }

  /**
   * Lógica del juego: usuario adivina si la carta siguiente es mayor, menor o igual.
   */
  suponer(valor: 'mayor' | 'menor' | 'igual') {
    if (this.finalizado) return;
  
    this.cartasService.obtenerCarta(this.mazoId).subscribe(resp => {
      this.cartaSiguiente = resp.cards[0];
      const actual = this.obtenerValorNumerico(this.cartaActual.value);
      const siguiente = this.obtenerValorNumerico(this.cartaSiguiente.value);
  
      const acierto =
        (valor === 'mayor' && siguiente > actual) ||
        (valor === 'menor' && siguiente < actual) ||
        (valor === 'igual' && siguiente === actual);
  
      // if (acierto) {
      //   this.puntaje++;
      //   this.mensaje = '¡Correcto!';
      //   this.esCorrecto = true;

      //   this.cartaActual = this.cartaSiguiente;
      //   this.cartaSiguiente = null;
  
      //   if (this.puntaje >= this.puntajeMaximo) {
      //     this.finalizado = true;
      //     this.cartaSiguiente = this.cartaActual; // Mostrar última carta como festejo
      //     this.mensaje = '¡Ganaste! Llegaste a 5 puntos 🎉';
      //     this.guardarPuntaje();
      //   }
  
      // } else {
      //   this.esCorrecto = false;
      //   this.finalizado = true;
      //   this.mensaje = 'Perdiste. Alcanzaste el límite de errores 😢';
      //   this.guardarPuntaje();
      // }
      if (acierto) {
        this.puntaje++;
        this.mensaje = '¡Correcto!';
        this.esCorrecto = true;

        // Si llegó al puntaje máximo, finaliza y muestra la cartaSiguiente real
        if (this.puntaje >= this.puntajeMaximo) {
          this.finalizado = true;
          this.mensaje = '¡Ganaste! Llegaste a 5 puntos 🎉';
          // Ahora sí: la carta que lo hizo ganar es cartaSiguiente
          // La mostramos al final
          this.guardarPuntaje();
        } else {
          // No ganó, así que avanzamos a la siguiente jugada
          this.cartaActual = this.cartaSiguiente;
          this.cartaSiguiente = null;
        }

      } else {
        this.esCorrecto = false;
        this.finalizado = true;
        this.mensaje = 'Perdiste. Alcanzaste el límite de errores 😢';
        this.guardarPuntaje();
      }
    
    });
  }

   /**
   * Guarda el puntaje en Supabase solo si el usuario está logueado.
   * Si no, muestra un aviso para registrarse/loguearse.
   */
  guardarPuntaje() {
    const usuarioObj = this.authService.getUsuarioActualValue();
    const usuario = typeof usuarioObj === 'string' ? usuarioObj : usuarioObj?.email || 'anónimo';
    // Si perdió, su puntaje será el alcanzado (no necesariamente 0)
    if (!usuario || usuario === 'anónimo') {
      this.mostrarAvisoLogin = true;
      return;
    }

    this.puntajesService.guardarPuntajeMayorOmenor(usuario, this.puntaje)
      .then(() => {
        this.mensaje += '\n\n¡Puntaje guardado!';
      })
      .catch(() => {
        this.mensaje += '\n\n(No se pudo guardar el puntaje)';
      });
  }
  
  /**
   * Convierte el valor de la carta a número para comparar.
   */
  obtenerValorNumerico(valor: string): number {
    const mapa: any = {
      ACE: 1,
      JACK: 11,
      QUEEN: 12,
      KING: 13
    };
    return mapa[valor] || parseInt(valor);
  }
}
