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

  constructor(private authService: AuthService,  private router: Router) {}
  
  ngOnInit(): void {
    this.authService.usuarioActual.subscribe(usuarioActual => {
      this.usuarioLogueado = usuarioActual;
    });
  }
  
  logout() {
    this.authService.logOut().then(() => {
      this.router.navigate(['/login']); // Redirige a la página de inicio de sesión 
  });}
  
  // Redirige al juego seleccionado
  irAJuego(nombreJuego: string) {
    // Lógica para redirigir al juego seleccionado
  }
  // Redirige a la sección de puntajes del juego
  verPuntajes(nombreJuego: string) {
    // Lógica para redirigir a la sección de puntajes del juego
  }

}
