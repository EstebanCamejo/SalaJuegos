import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CommonModule, NgIf } from '@angular/common';
import { TopResultadosComponent } from '../top-resultados/top-resultados.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgIf, TopResultadosComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  correoUsuario: string | null = null;
  juegoParaTop: string | null = null;

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
    this.router.navigate(['/juegos', nombreJuego]);
  }


  verPuntajes(juego: string) {
    this.juegoParaTop = juego;
  }
  
  cerrarTopResultados() {
    this.juegoParaTop = null;
  }
  
}
