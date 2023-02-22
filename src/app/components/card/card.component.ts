import { AuthService } from './../../services/auth.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon.interface';
import { lastValueFrom, Subscription, tap } from 'rxjs';
import { PokemonTeam } from 'src/app/interfaces/pokemon.team.interface';
import { AuthUser } from 'src/app/interfaces/login-register.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

    @Input('pokemon')
    pokemon!: Pokemon;

    subscriptions: Subscription[] = [];
    @Input('pokemonTeam') pokemonTeam: PokemonTeam[] = [];

    constructor(private pokemonSrv: PokemonService, private authSrv:AuthService) { }

    user: AuthUser|null = null;

    ngOnInit(): void {
        this.subscriptions.push(this.authSrv.user$.subscribe(data => data!=null ? this.user = data : this.user=null));
    }

    async choose(pokemon: Pokemon) {
        console.log(this.pokemonTeam);
        if (this.pokemonTeam.length <= 6) {
            console.log(this.pokemonTeam)
            const Team$ = this.pokemonSrv.setTeamMember(this.user!.user.id, pokemon);
            await lastValueFrom(Team$);
        }
    }

    //   ngOnDestroy(): void {
    //     this.subscriptions.map(s => s.unsubscribe());
    //   }

}
