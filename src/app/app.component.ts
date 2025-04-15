import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { NavbarComponent } from "./componentes/navbar/navbar.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, /*RouterLink,*/ CommonModule, NavbarComponent,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  /*
  authService = inject (AuthService);
  ngOnInit(): void {
    this.authService.supabase.auth.onAuthStateChange((event, session) => {
  
      if (event === 'SIGNED_IN') {
        this.authService.currentUser.set({
          email: session?.user.email!,
          username: session?.user.identities?.at(0)?.identity_data?.['username']
        });
      } 
      else if (event === 'SIGNED_OUT') {
        this.authService.currentUser.set(null);
      }
    });
  }
  logout(): void {
    this.authService.logout();
  }
*/


}