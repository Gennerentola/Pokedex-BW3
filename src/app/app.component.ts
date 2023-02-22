import { AuthUser } from './interfaces/login-register.interface';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokemonTeam } from './interfaces/pokemon.team.interface';
import { AuthService } from './services/auth.service';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'build-week3-fe0622a';
  name: string = ''
  loggato: boolean = false;
  user: AuthUser|null = null;

  subscriptions:Subscription[] = [];
  pokemonTeam:PokemonTeam[]=[];

  constructor(private authSrv: AuthService, private pokemonSrv:PokemonService) { }

  ngOnInit(): void {        // correggere numero
    this.subscriptions.push(this.authSrv.user$.subscribe(data => this.user = data));
    this.subscriptions.push(this.pokemonSrv.getTeamMembers(this.user!.user.id).subscribe(data => this.pokemonTeam = data));
    this.name = this.user!.user.name.charAt(0).toUpperCase() + this.user!.user.name.slice(1);
    this.loggato= localStorage.getItem('user')!== undefined || localStorage.getItem('user')!== null;
  }

  logout() {
    this.authSrv.logout()
  }


}
