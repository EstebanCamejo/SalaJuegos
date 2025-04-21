import { ReactiveFormsModule, FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component , inject} from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 
  correo: string = '';
  contrasena: string = '';
  mensajeError: string = '';
 

  constructor(private servicioAuth: AuthService, private router: Router) {}

  async ingresar() {
  //  const correo = this.formulario.value.correo;
  //  const contrasena = this.formulario.value.contrasena;
    const resultado = await this.servicioAuth.iniciarSesion(this.correo,this.contrasena);

    if (resultado.error) {
      this.mensajeError = 'Error al iniciar sesión: ' + resultado.error.message;
    } else {

      this.router.navigate(['/home']);
    }
  }
}
