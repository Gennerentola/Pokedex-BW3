import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonTeam } from 'src/app/interfaces/pokemon.team.interface';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-team-card',
    templateUrl: './team-card.component.html',
    styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit {

    @Input('teamMember') teamMember!:PokemonTeam;
    @ViewChild ('pokemonName') pokemonName!:ElementRef;
    @ViewChild ('editBtn') editBtn!:ElementRef;
    visible:boolean = true;

    constructor(private pokemonSrv:PokemonService) { }

    ngOnInit(): void {

    }

    delPokemonTeam() {
        this.pokemonSrv.delTeamMember(this.teamMember.id);
        this.visible = false;
    }

    changePokemonName(member:PokemonTeam){
        if (this.pokemonName.nativeElement.readOnly==true) {
            this.pokemonName.nativeElement.removeAttribute("readonly");
            this.editBtn.nativeElement.classList.add("text-success");
        }
        else {
            this.pokemonName.nativeElement.setAttribute("readonly",true);
            this.editBtn.nativeElement.classList.remove("text-success");
            this.pokemonSrv.putTeamMember(member, this.pokemonName.nativeElement.value).subscribe({
                next: data => {
                    console.log(data);
                },
                error: error => {
                    console.log(error.message);
                }
            });
        }
    }
}
