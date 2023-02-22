import { Component } from '@angular/core';

@Component({
  selector: 'flippable-card-front',
  template: `
  <div class="flippable-card-front">
    <ng-content></ng-content>
  </div>
  `,
  styleUrls: ['./flippable-card.component.scss']
})
export class FlipCardFrontComponent {



}
