import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./componentes/navbar/navbar.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  

}