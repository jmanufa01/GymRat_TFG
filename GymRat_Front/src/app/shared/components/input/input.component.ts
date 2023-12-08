import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'shared-input',
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input()
  public inputclass: string = '';

  @Input()
  public listclass: string = '';

  @Input()
  public inputType: string = '';

  @Input()
  public inputPlaceholder: string = '';

  @Input()
  public inputStep: string = '';

  @Input()
  public label: string = '';

  @Input()
  public hints: string[] = [];

  @Input()
  public selectorTypes: any[] = [];

  @Input()
  public inputValue: any = '';

  @Output()
  public keyUp = new EventEmitter<any>();

  onInput(event: any) {
    this.inputValue = event.target.value;
  }

  onKeyUp(event: any) {
    this.keyUp.emit(event.target.value);
  }
}
