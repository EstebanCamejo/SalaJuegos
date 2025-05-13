import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosRoutingModule } from './juegos-routing.module';

// Importar los componentes de los juegos aquí
import { AhorcadoComponent } from './componentes/ahorcado/ahorcado.component';
import { MayorOMenorComponent } from '../juegos/componentes/mayor-o-menor/mayor-o-menor.component';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';

@NgModule({
  declarations: [   
    MayorOMenorComponent, 
    AhorcadoComponent,
    PreguntadosComponent,
    //juegopropio
    //resultados
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    
  ]
})
export class JuegosModule {}
