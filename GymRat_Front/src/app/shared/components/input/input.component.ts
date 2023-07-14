import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-input',
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input('inputType')
  public inputType: string = '';

  @Input('inputPlaceholder')
  public inputPlaceholder: string = '';

  @Input()
  public inputStep: string = '';
}
