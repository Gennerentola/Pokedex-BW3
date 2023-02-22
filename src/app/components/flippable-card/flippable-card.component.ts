import { AuthUser } from 'src/app/interfaces/login-register.interface';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/interfaces/pokemon.interface';
import { Component, ElementRef, OnInit, HostListener, Input, ViewChild, AfterViewInit } from '@angular/core';
import { PokemonTeam } from 'src/app/interfaces/pokemon.team.interface';
import { lastValueFrom, Subscription } from 'rxjs';


@Component({
    selector: 'app-flippable-card',
    templateUrl: './flippable-card.component.html',
    styleUrls: ['./flippable-card.component.scss']
})
export class FlippableCardComponent implements OnInit, AfterViewInit {

    turned = false;
    @Input('pokemon') pokemon!:Pokemon;
    @Input('user') user?:AuthUser|null;
    @ViewChild('pokeball') pokeball!:ElementRef;
    //@Input('pokemonTeam')
    pokemonTeam: PokemonTeam[] = [];
    subscriptions:Subscription[] = [];
    squadMembers: number = 0;

    tiltEffectSettings = {
        max: 25,
        perspective: 1000,
        scale: 1.05,
        speed: 500,
        easing: "cubic-bezier(.03,.98,.52,.99)"
    };

    constructor(private element:ElementRef, private pkSrv:PokemonService) {}

    ngOnInit() {
        this.subscriptions.push(this.pkSrv.pokemonTeam$.subscribe(data => this.pokemonTeam=data));
        this.subscriptions.push(this.pkSrv.squadMembers$.subscribe(data => this.squadMembers=data));
    }

    ngAfterViewInit(): void {
        for (let i=0; i<this.pokemonTeam.length; i++) {
            if (this.pokemon.id == this.pokemonTeam[i].pokemon.id) {
                this.pokeball.nativeElement.style.backgroundColor = "red";
                this.pokeball.nativeElement.style.borderRadius = "50%";
            }
        }
    }

    @HostListener('mousemove',['$event'])
    cardMouseMove(event:MouseEvent):void {
        const cardWidth = this.element.nativeElement.offsetWidth;
        const cardHeight = this.element.nativeElement.offsetHeight;
        const centerX = this.element.nativeElement.offsetLeft + cardWidth/2;
        const centerY = this.element.nativeElement.offsetTop + cardHeight/2;
        const mouseX = event.clientX - centerX;
        const mouseY = event.clientY - centerY;
        const rotateXUncapped = (+1)*(this.tiltEffectSettings.max*mouseY/(cardHeight/2));
        const rotateYUncapped = (-1)*(this.tiltEffectSettings.max*mouseX/(cardWidth/2));
        const rotateX = rotateXUncapped < -this.tiltEffectSettings.max ? -this.tiltEffectSettings.max : (rotateXUncapped > this.tiltEffectSettings.max ? this.tiltEffectSettings.max : rotateXUncapped);
        const rotateY = rotateYUncapped < -this.tiltEffectSettings.max ? -this.tiltEffectSettings.max : (rotateYUncapped > this.tiltEffectSettings.max ? this.tiltEffectSettings.max : rotateYUncapped);
        this.element.nativeElement.style.transform =   `perspective(${this.tiltEffectSettings.perspective}px)
                                                        rotateX(${rotateX}deg)
                                                        rotateY(${rotateY}deg)
                                                        scale3d(${this.tiltEffectSettings.scale}, ${this.tiltEffectSettings.scale}, ${this.tiltEffectSettings.scale})`;
    }

    //riporta la carta in posizione iniziale
    @HostListener('mouseleave',['$event'])
    cardMouseLeave():void {
        this.element.nativeElement.style.transform = `perspective(${this.tiltEffectSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        this.cardMouseEnter();
    }

    @HostListener('mouseenter',['$event'])
    cardMouseEnter():void  {
        clearTimeout(this.element.nativeElement.transitionTimeoutId);
        this.element.nativeElement.style.transition = `transform ${this.tiltEffectSettings.speed}ms ${this.tiltEffectSettings.easing}`;
        this.element.nativeElement.transitionTimeoutId = setTimeout(() => {
            this.element.nativeElement.style.transition = "";
            }, this.tiltEffectSettings.speed);
    }

    //gira la carta cliccando sul bottone
    turnOver() {
        this.turned = !this.turned;
    }

    async choose(pokemon: Pokemon) {
        console.log(this.pokemonTeam);
        if (this.squadMembers < 6) {
            console.log(this.squadMembers)
            this.pokeball.nativeElement.style.backgroundColor = "red";
            this.pokeball.nativeElement.style.borderRadius = "50%";
            const Team$ = this.pkSrv.setTeamMember(this.user!.user.id, pokemon);
            await lastValueFrom(Team$);
        }
    }
}
