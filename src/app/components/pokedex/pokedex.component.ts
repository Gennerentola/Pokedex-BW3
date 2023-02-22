import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, lastValueFrom } from 'rxjs';
import { AuthUser } from 'src/app/interfaces/login-register.interface';
import { Pokemon } from 'src/app/interfaces/pokemon.interface';
import { PokemonTeam } from 'src/app/interfaces/pokemon.team.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

    @ViewChild('form', { static: true }) form!: NgForm;

    pokemon: Pokemon[] = [];
    pokemonfil: Pokemon[] = [];
    pokemonTeam: PokemonTeam[] = [];
    nomePokemon: string = '';
    tipo: string = '';
    attivo: boolean = false;
    user: AuthUser | null = null;
    subscriptions: Subscription[] = [];


    constructor(private pkSrv: PokemonService, private authSrv: AuthService) { }

    ngOnInit(): void {
        this.subscriptions.push(this.authSrv.user$.subscribe(data => this.user = data));
        this.subscriptions.push(this.pkSrv.getTeamMembers(this.user!.user.id).subscribe(data => this.pokemonTeam = data));
        setTimeout(() => {
            this.pkSrv.getPokemon().subscribe((res) => {
                this.pokemon = res;
                this.attivo = true;
            });
        }, 1000)
    }

    submit() {
        let str: string = this.form.value.name
        //this.nomePokemon = str.charAt(0).toUpperCase() + str.slice(1);
        this.getpokemonfil(str);
    }

    type(type: string) {
        this.tipo = type;
        this.pkSrv.getPokemon().subscribe((res) => {
            this.pokemon = res.filter(pokemon => this.tipo == pokemon.type[0] || this.tipo == pokemon.type[1]);
        });
    }

    allPokemon() {
        this.pkSrv.getPokemon().subscribe((res) => {
            this.pokemon = res;
        });
    }

    getpokemonfil(nome: string) {
        this.pkSrv.getPokemonFiltered(nome).subscribe((res) => {
            this.pokemon = res;
            this.attivo = true
            console.log(this.pokemon)
        });
    }

    async choose(pokemon: Pokemon) {
        console.log(this.pokemonTeam);
        if (this.pokemonTeam.length <= 6) {
            console.log(this.pokemonTeam)
            const Team$ = this.pkSrv.setTeamMember(this.user!.user.id, pokemon);
            await lastValueFrom(Team$);
        }
    }
}
