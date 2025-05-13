import { Component, OnInit, OnDestroy,ViewChild, ElementRef,AfterViewChecked  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, AfterViewChecked , OnDestroy {

  mensajes: any[] = [];
  nuevoMensaje: string = '';
  usuarioEmail: string = '';
  canalSuscripcion: any;
  debeScrollear: boolean = false;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;


  constructor(private chatService: ChatService, private authService: AuthService) {}

  ngOnInit() {
    const usuario = this.authService.getUsuarioActualValue();
    if (usuario) {
      this.usuarioEmail = usuario.email;
    }

    this.cargarMensajes();

      this.canalSuscripcion = this.chatService.suscribirseMensajes((nuevoMensaje, evento) => {
        console.log('Evento recibido:', evento, nuevoMensaje);
        if (evento === 'INSERT') {
          this.mensajes.push(nuevoMensaje);        
          this.debeScrollear = true;          

        } else if (evento === 'UPDATE') {
          const index = this.mensajes.findIndex(m => m.id === nuevoMensaje.id);
          if (index !== -1) {
            this.mensajes[index] = nuevoMensaje;
          }
        }
      });
    
  }

  async cargarMensajes() {
    try {
      this.mensajes = await this.chatService.obtenerMensajes();
      this.scrollAlFondo(); // desplaza al fondo al cargar mensajes
    } catch (error) {
      console.error('Error al cargar mensajes:', error);
    }
  }

  async enviarMensaje() {
    if (this.nuevoMensaje.trim() === '') return;
    try {
      await this.chatService.enviarMensaje(this.usuarioEmail, this.nuevoMensaje);
      this.nuevoMensaje = '';      
    }
     catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  }

  ngOnDestroy() {
    if (this.canalSuscripcion) {
      this.chatService.cerrarSuscripcion(this.canalSuscripcion);
    }
  }

  ngAfterViewChecked() {
    if (this.debeScrollear) {
      this.scrollAlFondo();
      this.debeScrollear = false;
    }
  }
  
  private scrollAlFondo(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (error) {
      console.error('Error al mover scroll:', error);
    }
  }
}
