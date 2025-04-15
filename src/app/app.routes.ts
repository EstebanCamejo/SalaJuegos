import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { SobremiComponent } from './componentes/sobremi/sobremi.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';


export const routes: Routes = [

 /* { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path : 'login', component: LoginComponent },
    { path : 'home', component: HomeComponent },
    { path : 'sobremi', component: SobremiComponent },
    { path : 'registro', component: RegistroComponent },
    { path : '**', redirectTo: '/login' }*/
    /*
    {
        path: 'juegos', component: JuegosComponent,
        children: [{
            path: 'juego1', component: Juego1Component,
            
        }]
    }
    // Ruta para manejar rutas no encontradas
    { path: '**', component: PageNotFoundComponent } */

    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirecciona al login por defecto
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'sobremi', component: SobremiComponent },
    { path: '**', redirectTo: 'login' } // Ruta comodín en caso de ruta no existente
];
