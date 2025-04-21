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
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Metodo que se ejecuta al enviar el formulario
  async registrar() {
    if (this.formulario.invalid) return;

    const { correo, contrasena} = this.formulario.value;
    
    const resultado = await this.servicioAuth.registrarUsuario(correo, contrasena);

    if (resultado.error) {

      this.mensajeError = 'Error al registrar: ' + resultado.error.message;
      
    } else {
      
      this.router.navigate(['/home']);
    }
  }
}
