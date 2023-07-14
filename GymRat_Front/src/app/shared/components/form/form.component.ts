import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  @Input()
  public formStyle: String = '';
}
