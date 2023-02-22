import { FlippableCardComponent } from './flippable-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlipCardFrontComponent } from './card-front';
import { FlipCardBackComponent } from './card-back';



@NgModule({
    declarations: [
        FlippableCardComponent,
        FlipCardFrontComponent,
        FlipCardBackComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FlippableCardComponent,
        FlipCardFrontComponent,
        FlipCardBackComponent
    ]
})
export class FlippableCardModule { }
