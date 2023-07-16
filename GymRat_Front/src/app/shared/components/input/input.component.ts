import { Component, Input } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';

@Component({
  selector: 'shared-input',
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input()
  public inputType: string = '';

  @Input()
  public inputPlaceholder: string = '';

  @Input()
  public inputStep: string = '';

  @Input()
  public inputFormControl: FormControl = new FormControl('');
}
