import { Component, inject , OnInit} from '@angular/core';
import { ReactiveFormsModule, FormBuilder,Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {
/*  fb = inject(FormBuilder);
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
    this.authService.register(rawForm.email, rawForm.password, rawForm.username

    ).subscribe(result => {
      if (result.error) {
        this.errorMessage = result.error.message;
      }else{
        this.router.navigate(['/login']);
      }
    });
  }*/

  formulario: FormGroup;
  mensajeError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private servicioAuth: AuthService
  ) {
    // Se inicializa el formulario con validaciones
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit(): void {}

  // Metodo que se ejecuta al enviar el formulario
  async registrar() {
    if (this.formulario.invalid) return;

    const correo = this.formulario.value.correo;
    const contrasena = this.formulario.value.contrasena;

    const { error } = await this.servicioAuth.registrarUsuario(correo, contrasena);

    if (error) {
      this.mensajeError = 'Error al registrar: ' + error.message;
    } else {
      this.mensajeError = '';
      console.log('Registro exitoso');
      // Redirigir o mostrar confirmación si querés
    }
  }
}
