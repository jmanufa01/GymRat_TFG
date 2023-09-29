import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'shared-input',
  templateUrl: './input.component.html',
})
export class InputComponent {
  constructor(private elRef: ElementRef) {}

  @Input()
  public inputClass: string = '';

  @Input()
  public listClass: string = '';

  @Input()
  public inputType: string = '';

  @Input()
  public inputPlaceholder: string = '';

  @Input()
  public inputStep: string = '';

  @Input()
  public hints: string[] = [];

  @Input()
  public selectorTypes: any[] = [];
}
