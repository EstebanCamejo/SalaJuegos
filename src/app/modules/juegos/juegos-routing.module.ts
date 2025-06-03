import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './componentes/ahorcado/ahorcado.component';
import { MayorOMenorComponent } from './componentes/mayor-o-menor/mayor-o-menor.component';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';
import { EmojiDiferenteComponent } from './componentes/emoji-diferente/emoji-diferente.component';

const routes: Routes = [
  { path: 'ahorcado', component: AhorcadoComponent },
  { path: 'mayor-o-menor', component: MayorOMenorComponent },
  { path: 'preguntados', component: PreguntadosComponent },  
  { path: 'emoji-diferente', component: EmojiDiferenteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule {}

