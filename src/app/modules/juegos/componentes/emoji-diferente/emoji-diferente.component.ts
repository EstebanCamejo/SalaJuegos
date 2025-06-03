import { AuthService } from '../../../../../app/auth.service';
import { PuntajesService } from '../../../../services/puntajes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emoji-diferente',
  templateUrl: './emoji-diferente.component.html',
  styleUrls: ['./emoji-diferente.component.css'],
  standalone: false
})
export class EmojiDiferenteComponent implements OnInit {
  
  nivel: number = 1;
  vidas: number = 3;
  dificultadSeleccionada: number = 1; // 1=fácil, 2=medio, 3=difícil
  errores: number = 0; // Errores en toda la partida
  puntaje: number = 0;
  tiempoRestante: number = 5;
  
  tablero: string[] = [];
  correctas: number[] = [];
  seleccionados: number[] = [];

  totalCorrectas: number = 1;// cambia según dificultad
  timer: any;
  jugando: boolean = false;
  finalizado: boolean = false;
  mensajeFinal: string = '';
  mostrarAvisoLogin: boolean = false; // Para el aviso de login

  emojis: string[] = ['😀','😃','😄','😁','😆','😅','😂','🙂','🙃','😐','😶','😑','😬','😯','😲','😮'];
  
  constructor(
    private authService: AuthService,
    private puntajesService: PuntajesService
  ) {}
  ngOnInit(): void {this.mostrarAvisoLogin = !this.usuarioLogueado();}
 
  usuarioLogueado(): boolean {
    const usuario = this.authService.getUsuarioActualValue();
    return !!usuario && usuario !== 'anónimo';
  }
   /**
   * Selecciona la dificultad y reinicia el juego.
   */
  seleccionarDificultad(valor: number) {
    this.dificultadSeleccionada = valor;
    this.totalCorrectas = valor;
    this.reiniciarJuego();
  }

   /**
   * Reinicia el estado del juego y arranca la cuenta regresiva.
   */
  reiniciarJuego() {
    this.nivel = 1;
    this.vidas = 3;
    this.puntaje = 0;
    this.errores = 0;
    this.finalizado = false;
    this.jugando = false;
    this.mensajeFinal = '';
    this.seleccionados = [];
    //this.mostrarAvisoLogin = false;

    //Mostrar cuenta regresiva
    this.mensajeFinal = '¡Preparado! El juego inicia en 3...';
    let countdown = 3;
    const interval = setInterval(() => {
      countdown--;
      if(countdown>0){
        this.mensajeFinal = `¡Preparado! El juego inicia en ${countdown}...`;
      }else{
        clearInterval(interval);
        this.jugando = true;
        this.mensajeFinal = '';
        this.nuevaRonda();
      }
    }, 1000);
  }

  /**
   * Genera el tablero de emojis para la ronda actual.
   */
  nuevaRonda() {

    this.tablero = [];
    this.seleccionados = [];

    const baseEmoji = this.emojis[Math.floor(Math.random() * this.emojis.length)];

    // Elegir emojis distintos según dificultad
    const diferentes: string[] = [];
    while (diferentes.length < this.totalCorrectas) {
      const nuevo = this.emojis[Math.floor(Math.random() * this.emojis.length)];
      if (!diferentes.includes(nuevo) && nuevo !== baseEmoji) {
        diferentes.push(nuevo);
      }
    }

    //Determina cuántos botones/emojis debe tener el tablero según el nivel (10, 20, 30, ...).
    const total = this.nivel * 10;

    //Genera un array con las posiciones (índices) donde estarán los emojis diferentes en el tablero.
    // Si hay más de un emoji distinto, cada uno va en una posición única y aleatoria.
    this.correctas = [];
    while (this.correctas.length < this.totalCorrectas) {
      const rand = Math.floor(Math.random() * total);
      if (!this.correctas.includes(rand)) this.correctas.push(rand);
    }
    //Va recorriendo del 0 al total-1 para llenar el tablero.
    // Si el índice i es una posición “correcta” (de los distintos):
    // Pone en ese lugar el emoji diferente correspondiente de la lista.
    // Si no pone el emoji base.
    // Así, la cantidad de emojis distintos depende de la dificultad, y todos los demás son el emoji común.
    for (let i = 0; i < total; i++) {
      if (this.correctas.includes(i)) {
        const idx = this.correctas.indexOf(i);
        this.tablero.push(diferentes[idx]);
      } else {
        this.tablero.push(baseEmoji);
      }
    }
    //Llama a la función que inicia el timer de la ronda.
    this.resetearTimer();
  }

   /**
   * Maneja la selección de un emoji por el usuario.
   * índice del emoji seleccionado
   */
  seleccionarEmoji(index: number) {

    if(this.seleccionados.includes(index)) return; // Evita seleccionar el mismo emoji varias veces    
    this.seleccionados.push(index);//Marca el emoji como ya clickeado (lo deshabilita visualmente)
    
    if (!this.jugando || this.finalizado) return; //Chequear si el juego está activo

    if (this.correctas.includes(index)) {
      this.tablero[index] = '✅'; // Marca acierto visualmente en el tablero
      this.correctas = this.correctas.filter(i => i !== index);// Saca esa posición de las correctas pendientes
      this.puntaje += 10;

      if (this.correctas.length === 0) {
        if (this.nivel === 5) {
          this.finalizarJuego(true); // ¡Ganó!
        } else {
          this.nivel++;
          setTimeout(() => this.nuevaRonda(), 600);// Pasa al próximo nivel tras 0.6s
        }
      }
    } else {
      this.vidas--;  // Clickeó un emoji incorrecto
      this.errores++;
      this.tablero[index] = '❌'; // Marca el error visualmente
      if (this.vidas === 0 || this.errores === 3) {
        this.finalizarJuego(false);// Pierde si llega a 3 errores o 0 vidas
      }
    }
  }
  
  /**
   * Reinicia el temporizador por ronda.
   */
  resetearTimer() {
    
    clearInterval(this.timer);// Detiene cualquier timer previo
    this.tiempoRestante = 5;// Reinicia el tiempo a 5 segundos

    this.timer = setInterval(() => {// Crea un nuevo intervalo que se ejecuta cada 1 segundo
      this.tiempoRestante--;
      if (this.tiempoRestante === 0) {
        
        clearInterval(this.timer);// Cuando llega a 0, detiene el timer
        this.vidas--;// Pierde una vida por no elegir a tiempo
        this.errores++;// Suma un error global por timeout
        if (this.vidas === 0 || this.errores === 3) {
          this.finalizarJuego(false); // Pierde si ya no tiene vidas o suma 3 errores
        } else {
          this.nuevaRonda();// Si no perdió, pasa a la siguiente ronda
        }
      }
    }, 1000); // Intervalo de 1 segundo
  }

   /**
   * Calcula el puntaje final según la dificultad y errores.
   */
  calcularPuntajeFinal(): number {    
    const tablas : { [key: number]: { [key: number]: number } } = {
      1: { 0: 10, 1: 4, 2: 3 },      // fácil
      2: { 0: 100, 1: 40, 2: 30 },   // medio
      3: { 0: 1000, 1: 400, 2: 300 } // difícil
    };

    // Si perdió, puntaje es 0
    if (this.vidas === 0 || this.errores >= 3) return 0;
    return tablas[this.dificultadSeleccionada][this.errores] || 0;
  }

  /**
   * Finaliza la partida, calcula el puntaje y guarda solo si hay usuario logueado.
   * Si no, muestra el aviso para login/registro.
   */
  finalizarJuego(gano: boolean = false) {
    this.finalizado = true;
    this.jugando = false;
    clearInterval(this.timer);
    let puntajeFinal = 0;

    if (this.vidas === 0 || this.errores >= 3) {      
      this.mensajeFinal = `🚩 ¡Perdiste! Tu puntaje es 0.`;
    } else {
      puntajeFinal = this.calcularPuntajeFinal();
      this.mensajeFinal = `🎉 ¡Ganaste! Puntaje final: ${puntajeFinal}`;
      
      // Guardar puntaje solo si hay login
      const usuarioObj = this.authService.getUsuarioActualValue();
      const usuario = typeof usuarioObj === 'string' ? usuarioObj : usuarioObj?.email || 'anónimo';
      
      if (!usuario || usuario === 'anónimo') {
        this.mostrarAvisoLogin = true;
        return;
      }

      this.puntajesService.guardarPuntajeEmoji(usuario, puntajeFinal)
        .then(() => {
          this.mensajeFinal += "\n\n¡Puntaje guardado en el ranking!";
        })
        .catch(() => {
          this.mensajeFinal += "\n\n(No se pudo guardar el puntaje)";
        });
    }
  }
  
}
