import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}

  // Redirige al juego seleccionado
  irAJuego(nombreJuego: string) {
    this.router.navigate(['/juego', nombreJuego]);
  }

  // Redirige a la sección de puntajes del juego
  verPuntajes(nombreJuego: string) {
    this.router.navigate(['/puntajes', nombreJuego]);
  }
}
