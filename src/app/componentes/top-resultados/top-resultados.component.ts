
import { Component, Input, OnInit } from '@angular/core';
import { PuntajesService } from '../../services/puntajes.service';
import { Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-top-resultados',
  templateUrl: './top-resultados.component.html',
  styleUrl: './top-resultados.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class TopResultadosComponent implements OnInit {  
  //-  Recibe el nombre del juego desde el componente padre (HomeComponent).
  @Input() juego: string = 'ahorcado'; // por defecto ahorcado
  top: any[] = [];
  mensaje: string = '';
  //- Emite un evento para cerrar el componente y volver al HomeComponent.
  @Output() cerrar = new EventEmitter<void>();

  constructor(private puntajesService: PuntajesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.juego = params.get('juego') ?? 'ahorcado';
      this.cargarTop();
    });
  }

  //- Método para cargar el top de puntajes según el juego seleccionado.
  //- Utiliza el servicio PuntajesService para obtener los datos.
  async cargarTop() {
    this.mensaje = 'Cargando...';
    try {
      switch (this.juego) {
        case 'ahorcado':
          this.top = await this.puntajesService.traerTopAhorcado();
          console.log(this.top);
          break;
        case 'mayor-o-menor':
          this.top = await this.puntajesService.traerTopMayorMenor();
          break;
        case 'preguntados':
          this.top = await this.puntajesService.traerTopPreguntados();
          break;
        case 'emoji-diferente':
          this.top = await this.puntajesService.traerTopEmojiDiferente();
          break;
        default:
          this.top = [];
          this.mensaje = 'No hay resultados para este juego.';
      }
      if (!this.top.length) {
        this.mensaje = 'No hay resultados registrados.';
      } else {
        this.mensaje = '';
      }
    } catch (e) {
      this.mensaje = 'No se pudo cargar el ranking.';
    }
   }

  //- Método para cerrar el componente y volver al HomeComponent.
  volverAlHome() {
    this.router.navigate(['/home']);
  }
}
