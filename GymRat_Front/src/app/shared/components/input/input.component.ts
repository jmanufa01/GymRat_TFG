import { Component, Input } from '@angular/core';
import { GymExperienceType } from '../../../shared/interfaces';

@Component({
  selector: 'shared-input',
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input()
  public inputClass: string = '';

  @Input()
  public inputType: string = '';

  @Input()
  public inputPlaceholder: string = '';

  @Input()
  public inputStep: string = '';

  public gymExperienceTypes = Object.values(GymExperienceType);
}
