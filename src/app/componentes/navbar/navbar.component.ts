
import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router , RouterModule} from '@angular/router';
import { CommonModule, NgIf  } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, NgIf]
})
export class NavbarComponent implements OnInit {
  
  usuarioLogueado: any = null;
  rutaActual: string = ''; 

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.usuarioActual.subscribe(usuarioActual => {
      this.usuarioLogueado = usuarioActual;
    });
    // Guarda la ruta actual (para los *ngIf de login/registro)
    this.router.events.subscribe(() => {
      this.rutaActual = this.router.url;
    });
  }

  get isLogin(): boolean {
    return this.router.url.startsWith('/login');
  }

  get isRegistro(): boolean {
    return this.router.url.startsWith('/registro');
  }

  // Para el click en el logo o "Arcade Pixel"
  goHomeOrLogin() {
    if (this.usuarioLogueado) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
