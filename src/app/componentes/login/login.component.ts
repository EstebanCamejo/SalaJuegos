
//import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
//import { AuthService } from '../../auth.service';

import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  /*
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);
  
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  
  errorMessage: string | null = null;

  onSubmit():void{
    const rawForm = this.form.getRawValue();
    this.authService.login(rawForm.email, rawForm.password)
    .subscribe(result => {
      if (result.error) {
        this.errorMessage = result.error.message;
      }else{
        this.router.navigate(['/login']);
      }
    });
  }
*/
  correo: string = '';
  contrasena: string = '';
  mensajeError: string = '';

  constructor(private servicioAuth: AuthService) {}
  async ingresar() {
    const { error } = await this.servicioAuth.iniciarSesion(this.correo, this.contrasena);

    if (error) {
      this.mensajeError = 'Error al iniciar sesión: ' + error.message;
    } else {
      this.mensajeError = '';
      console.log(' Sesión iniciada con éxito');
      // Podés redirigir al usuario o mostrar un mensaje aquí
    }
  }
}
