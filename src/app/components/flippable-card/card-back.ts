import { Component } from '@angular/core';

@Component({
  selector: 'flippable-card-back',
  template: `
   <div class="flippable-card-back">
    <ng-content></ng-content>
  </div>
  `,
  styleUrls: ['./flippable-card.component.scss']
})
export class FlipCardBackComponent {}
