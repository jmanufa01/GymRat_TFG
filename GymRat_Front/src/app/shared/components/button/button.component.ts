import { Component, EventEmitter, Input, Output } from '@angular/core';
import { F } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'shared-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input()
  public buttonStyle: String = '';
  @Input()
  public buttonType: String = '';
  @Output()
  public onButtonClick: EventEmitter<MouseEvent> = new EventEmitter();

  public onClick(event: MouseEvent): void {
    this.onButtonClick.emit(event);
  }
}
