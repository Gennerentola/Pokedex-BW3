import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfiloComponent } from './components/profilo/profilo.component';
import { LoginComponent } from './components/login/login.component';
import { RegistratiComponent } from './components/registrati/registrati.component';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './components/card/card.component';
import { TeamCardComponent } from './components/team-card/team-card.component';
import { FormsModule } from '@angular/forms';
import { FlippableCardModule } from './components/flippable-card/flippable-card.module';
import { PokedexComponent } from './components/pokedex/pokedex.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfiloComponent,
    HomeComponent,
    LoginComponent,
    RegistratiComponent,
    CardComponent,
    PokedexComponent,
    TeamCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FlippableCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
