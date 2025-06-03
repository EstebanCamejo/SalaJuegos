import { Component, OnInit, OnDestroy,ViewChild, ElementRef,AfterViewChecked  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  providers: [DatePipe],
})
export class ChatComponent implements OnInit, AfterViewChecked , OnDestroy {

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  mensajes: any[] = [];
  nuevoMensaje: string = '';
  usuarioEmail: string = '';
  canalSuscripcion: any;
  debeScrollear: boolean = false;

  timezone = 'America/Argentina/Buenos_Aires';

  constructor(
    private chatService: ChatService, 
    private authService: AuthService, 
    private datePipe: DatePipe) {}

  ngOnInit() {
    const usuario = this.authService.getUsuarioActualValue();
    if (usuario) {
      this.usuarioEmail = usuario.email;
    }

    this.cargarMensajes();

    this.canalSuscripcion = this.chatService.suscribirseMensajes((nuevoMensaje, evento) => {

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
      this.debeScrollear = true;
      //this.scrollAlFondo(); // desplaza al fondo al cargar mensajes
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
   /**
   * Hace scroll hacia el último mensaje en pantalla.
   */
  private scrollAlFondo(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (error) {
      console.error('Error al mover scroll:', error);
    }
  }

  coloresUsuarios: { [email: string]: string } = {};

  coloresDisponibles: string[] = [
    '#3e8ed0', // azul
    '#f39c12', // naranja
    '#9b59b6', // violeta
    '#1abc9c', // turquesa
    '#e74c3c', // rojo coral
    '#2ecc71', // verde
    '#34495e'  // gris azulado
  ];

  asignarColor(email: string): string {
    if (!this.coloresUsuarios[email]) {
      const usado = Object.values(this.coloresUsuarios);
      const siguiente = this.coloresDisponibles.find(c => !usado.includes(c)) || '#ffffff';
      this.coloresUsuarios[email] = siguiente;
    }
    return this.coloresUsuarios[email];
  }

  formatearFechaArgentina(fechaIso: string): string {
    const fecha = new Date(fechaIso);
    return this.datePipe.transform(fecha, 'dd/MM/yyyy HH:mm', 'UTC-6') || '';
  }

}
