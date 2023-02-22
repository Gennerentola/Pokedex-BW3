import { PokedexComponent } from './components/pokedex/pokedex.component';
import { RegistratiComponent } from './components/registrati/registrati.component';
import { LoginComponent } from './components/login/login.component';
import { ProfiloComponent } from './components/profilo/profilo.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TokenInterceptor } from './security/token.interceptor';

const routes: Routes = [
  {
    path:'pokedex',
    component: PokedexComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfiloComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "registrati",
    component: RegistratiComponent
  },
  { path: '**',
    redirectTo: ''},
];

@NgModule({
  providers: [
    // {
    //   provide:HTTP_INTERCEPTORS,
    //   useClass:TokenInterceptor,
    //   multi:true
    // }
  ],
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
