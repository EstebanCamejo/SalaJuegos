import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { SobremiComponent } from './componentes/sobremi/sobremi.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AuthGuard } from   './guards/auth.guards';
import { ChatComponent } from './componentes/chat/chat.component';


export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirecciona al login por defecto
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, // Ruta protegida por el guard
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'sobremi', component: SobremiComponent, canActivate: [AuthGuard] }, // Ruta protegida por el guard
    { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] }, // Ruta protegida por el guard
    {
        path: 'juegos',
        loadChildren: () => import('./modules/juegos/juegos.module').then(m => m.JuegosModule),
        canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: 'login' } // Ruta comodín en caso de ruta no existente
      
];
