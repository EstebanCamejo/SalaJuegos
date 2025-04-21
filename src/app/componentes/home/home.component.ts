import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  correoUsuario: string | null = null;

  constructor(private authService: AuthService ,private router: Router) {}

  ngOnInit():void {
    this.authService.usuarioActual.subscribe(
      usuario => {
        this.correoUsuario = usuario ?.email ?? null;
      }
    )
  }

  logOut() {
    this.authService.logOut().then(() => {
     
      this.router.navigate(['/login']);
    });
  }

  // Redirige al juego seleccionado
  irAJuego(nombreJuego: string) {
    this.router.navigate(['/juego', nombreJuego]);
  }

  // Redirige a la sección de puntajes del juego
  verPuntajes(nombreJuego: string) {
    this.router.navigate(['/puntajes', nombreJuego]);
  }
}
