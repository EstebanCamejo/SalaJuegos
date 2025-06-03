import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosRoutingModule } from './juegos-routing.module';

import { AhorcadoComponent } from './componentes/ahorcado/ahorcado.component';
import { MayorOMenorComponent } from '../juegos/componentes/mayor-o-menor/mayor-o-menor.component';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';
import { EmojiDiferenteComponent } from './componentes/emoji-diferente/emoji-diferente.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [   
    MayorOMenorComponent, 
    AhorcadoComponent,
    PreguntadosComponent,
    EmojiDiferenteComponent,

  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    FormsModule
  ]
})
export class JuegosModule {}
