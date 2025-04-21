import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  // Propiedades de la clase
  usuarioLogueado: any = null; // Nombre del usuario logueado
  router = inject(Router);

  constructor(private authService: AuthService) {}
  
    ngOnInit(): void {
      this.authService.usuarioActual.subscribe(user => {
        this.usuarioLogueado = user;
      });
    }
  
    logout() {
      this.authService.logOut();
    }
  // Redirige al juego seleccionado
  irAJuego(nombreJuego: string) {
    // Lógica para redirigir al juego seleccionado
  }

  // Redirige a la sección de puntajes del juego
  verPuntajes(nombreJuego: string) {
    // Lógica para redirigir a la sección de puntajes del juego
  }

}
