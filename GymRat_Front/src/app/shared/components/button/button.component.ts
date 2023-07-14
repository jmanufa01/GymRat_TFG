import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input()
  public buttonStyle: String = '';
}
