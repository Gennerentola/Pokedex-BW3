import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, Subscription, tap } from 'rxjs';
import { PokemonTeam } from '../interfaces/pokemon.team.interface';
import { AuthService } from './auth.service';
import { Pokemon } from '../interfaces/pokemon.interface';

@Injectable({
    providedIn: 'root'
})
export class PokemonService {

    private teamList = new BehaviorSubject<PokemonTeam[]>([]);
    private squadMembers = new BehaviorSubject<number>(0);

    pokemonTeam$ = this.teamList.asObservable();
    squadMembers$ = this.squadMembers.asObservable();
    teamCount: number = 0;
    subscriptions: Subscription[] = [];
    userId?: number;

    constructor(private http: HttpClient, private authSrv: AuthService) { }

    getTeamMembers(userId: number): Observable<PokemonTeam[]> {
        return this.http.get<PokemonTeam[]>(environment.api + "/team?userId=" + userId).pipe(tap((squad) => {
            this.teamList.next(squad);
            this.teamCount = squad.length;
            console.log("count = " + this.teamCount)
        }));
    }

    setTeamMember(userId: number, pokemon: Pokemon): Observable<PokemonTeam[]> {
        if (this.teamCount < 6) {
            this.teamCount+=1;
            this.squadMembers.next(this.teamCount);
            return this.http.post<PokemonTeam[]>(environment.api + "/team", { "userId": userId, "pokemon": pokemon })
        }
        return this.getTeamMembers(userId);
    }

    getPokemon() {
        return this.http.get<Pokemon[]>(environment.api + "/pokemon").pipe(catchError((err) => {
            throw new Error("GET fallita")
        }));
    }

    getPokemonFiltered(id:string) {
        return this.http.get<Pokemon[]>(environment.api + "/pokemon?name.english_like=" + id).pipe(catchError((err)=>{
            throw new Error("POKEMON NON TROVATO")
        }));
    }

    delTeamMember(id: number) {     //json server risponde male
        this.teamCount-=1;
        this.squadMembers.next(this.teamCount);
        this.http.delete(environment.api + "/team/" + id).subscribe({
            next: data => {
                console.log(data);
            },
            error: error => {
                console.log(error.message);
            }
        });
    }

    putTeamMember(pokemonTeam:PokemonTeam, nome:string){
        pokemonTeam.pokemon.name.english = nome;
        return this.http.put<PokemonTeam>(environment.api + "/team/" + pokemonTeam.id, {"id":pokemonTeam.id, "pokemon": pokemonTeam.pokemon, "userId":1/*this.userId*/})
    }
}
