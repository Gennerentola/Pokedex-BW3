import { AuthUser } from './../../interfaces/login-register.interface';
import { AuthService } from './../../services/auth.service';
import { PokemonTeam } from './../../interfaces/pokemon.team.interface';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-profilo',
    templateUrl: './profilo.component.html',
    styleUrls: ['./profilo.component.scss']
})
export class ProfiloComponent implements OnInit {

    @ViewChild('name') name!: ElementRef;
    @ViewChild('email') email!: ElementRef;
    @ViewChild('nameEditBtn') nameEditBtn!: ElementRef;
    @ViewChild('emailEditBtn') emailEditBtn!: ElementRef;

    subscriptions: Subscription[] = [];
    pokemonTeam: PokemonTeam[] = [];
    user: AuthUser | null = null;

    constructor(private pokemonSrv: PokemonService, private authSrv: AuthService) { }

    ngOnInit(): void {        // correggere numero
        this.subscriptions.push(this.authSrv.user$.subscribe(data => data != null ? this.user = data : this.user = null));
        this.subscriptions.push(this.pokemonSrv.getTeamMembers(this.user!.user.id).subscribe(data => this.pokemonTeam = data))
    }

    changeUsername() {
        if (this.name.nativeElement.readOnly == true) {
            this.name.nativeElement.removeAttribute("readonly");
            this.nameEditBtn.nativeElement.classList.add("text-success");
        }
        else {
            this.name.nativeElement.setAttribute("readonly", true);
            this.nameEditBtn.nativeElement.classList.remove("text-success");
            this.authSrv.changeUsername(this.name.nativeElement.value).subscribe({
                next: data => {
                    console.log(data);
                },
                error: error => {
                    console.log(error.message);
                }
            });
        }
    }

    changeUserEmail() {
        if (this.email.nativeElement.readOnly == true) {
            this.email.nativeElement.removeAttribute("readonly");
            this.emailEditBtn.nativeElement.classList.add("text-success");
        }
        else {
            this.email.nativeElement.setAttribute("readonly", true);
            this.emailEditBtn.nativeElement.classList.remove("text-success");
            this.authSrv.changeUserEmail(this.email.nativeElement.value).subscribe({
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
