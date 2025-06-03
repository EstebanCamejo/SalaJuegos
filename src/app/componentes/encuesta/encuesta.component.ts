import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EncuestaService } from '../../services/encuesta.service';
import { AuthService } from '../../auth.service';
import { Subscription  } from 'rxjs';


@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class EncuestaComponent implements OnInit, OnDestroy { 

  encuestaForm!: FormGroup;
  mensajeExito: string = '';
  mensajeError: string = '';
  usuarioEmail: string = ''; 
  usuarioSub!: Subscription;

  constructor(
    private fb: FormBuilder, 
    private encuestaService :EncuestaService, 
    private authService: AuthService
  ) {}
  
  ngOnInit() {
    this.encuestaForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{1,10}$/)]],
      recomendar: ['', Validators.required],
      juegoFavorito: ['', Validators.required],
      juegosNuevos: ['', Validators.required]
    });
    
    this.usuarioSub = this.authService.usuarioActual.subscribe(usuario => {
      if (usuario && usuario.email) {
        this.usuarioEmail = usuario.email;
      } else {
        this.usuarioEmail = 'anónimo';
      }
    });
  }

  enviarEncuesta() {
    if (this.encuestaForm.invalid) return;           
    const form = this.encuestaForm.value;
    const encuestaSupabase = {
      nombre: form.nombre,
      apellido: form.apellido,
      edad: Number(form.edad), 
      telefono: form.telefono,
      recomendar: form.recomendar,
      juego_favorito: form.juegoFavorito, 
      juegos_nuevos: form.juegosNuevos,  
      fecha: new Date(),   
      usuario_email: this.usuarioEmail                
    };
    


    this.encuestaService.guardarEncuesta(encuestaSupabase)
      .then(() => {
        this.mensajeExito = "¡Gracias por tu feedback! Tu encuesta fue enviada con éxito 🙌";
        this.mensajeError = "";
        this.encuestaForm.reset();
      })
      .catch(() => {
        this.mensajeError = "No se pudo enviar la encuesta, intentá nuevamente.";
        this.mensajeExito = "";
      });      
  }

  ngOnDestroy() {
    // limpieza de subscripciones u otros recursos
    if (this.usuarioSub) {
      this.usuarioSub.unsubscribe();
    }
  }
  
}
