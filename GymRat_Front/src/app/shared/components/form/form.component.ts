import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'shared-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  @Input()
  public formStyle: String = '';

  @Input()
  public group: FormGroup<any> = new FormGroup({});

  @Input()
  public submitFunction: Function = (): any => {};
}
