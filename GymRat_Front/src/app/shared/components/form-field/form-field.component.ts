import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-form-field',
  templateUrl: './form-field.component.html',
})
export class FormFieldComponent {
  @Input()
  public label: string = '';

  @Input()
  public inputType: string = '';

  @Input()
  public inputPlaceholder: string = '';
}
