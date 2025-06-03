import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { SobremiComponent } from './componentes/sobremi/sobremi.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AuthGuard } from   './guards/auth.guards';
import { ChatComponent } from './componentes/chat/chat.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { TopResultadosComponent } from './componentes/top-resultados/top-resultados.component';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirecciona al login por defecto
    { path: 'home', component: HomeComponent}, 
    { path: 'login', component: LoginComponent},
    { path: 'registro', component: RegistroComponent},
    { path: 'sobremi', component: SobremiComponent}, 
    { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] }, // Ruta protegida por el guard
    {
        path: 'juegos',
        loadChildren: () => import('./modules/juegos/juegos.module').then(m => m.JuegosModule)
    },
    { path: 'encuesta', component: EncuestaComponent}, 
    { 
        path: 'top-resultados/:juego', 
        component: TopResultadosComponent, 
        canActivate: [AuthGuard] 
      },
    
    { path: '**', redirectTo: 'home' } // Ruta comodín en caso de ruta no existente
      
];
