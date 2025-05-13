// mayor-o-menor.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartasService } from '../../../../services/cartas.service';

@Component({
  selector: 'app-mayor-o-menor', 
  standalone: false,
  //imports: [],
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
  
  constructor(private cartasService: CartasService) {}


  ngOnInit(): void {
    this.inicializarJuego();
  }

  ngOnDestroy(): void {
 
  }

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

      if (acierto) {
        this.puntaje++;
        this.mensaje = '¡Correcto!';
        this.esCorrecto = true;
        this.cartaActual = this.cartaSiguiente;
        this.cartaSiguiente = null;

        if (this.puntaje >= this.puntajeMaximo) {
          this.finalizado = true;
          this.cartaSiguiente = this.cartaActual; // Mostrar última carta como festejo
          this.mensaje = '¡Ganaste! Llegaste a 5 puntos 🎉';
        }

      } else {
        this.esCorrecto = false;
        this.finalizado = true;
        this.mensaje = 'Perdiste. Alcanzaste el límite de errores 😢';
      }
    });
  }

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
