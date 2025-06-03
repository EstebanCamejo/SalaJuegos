import { Component, OnInit} from '@angular/core';
import { ReactiveFormsModule, FormBuilder,Validators, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {

  formulario!: FormGroup;
  mensajeError: string = '';

  constructor(
    private fb: FormBuilder,
    private servicioAuth: AuthService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.formulario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Metodo que se ejecuta al enviar el formulario
  async registrar() {
    if (this.formulario.invalid) return;

    const {correo, contrasena} = this.formulario.value;    

    this.mensajeError = 'Cargando...';

    try{

      const {error} = await this.servicioAuth.registrarUsuario(correo, contrasena);

      if (error) {        
        if(error.message?.toLowerCase().includes('user already registered')) { 
          this.mensajeError = 'Este correo ya esta registrado. Proba inciar sesion directamente.';
        } else {
          this.mensajeError = 'Ocurrio un error durante el registro. Intenta nuevamente.';
        }
        return;   
      }
      this.router.navigate(['/home']);
    }catch (error) {
      this.mensajeError = "Error inesperado. Por favor intenta nuevamente mas tarde.";
      console.error(error);
    }
  }
}
