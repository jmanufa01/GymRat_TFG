import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { co } from '@fullcalendar/core/internal-common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import { is } from 'date-fns/locale';

@Component({
  selector: 'shared-dropdown',
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent {
  constructor(private ref: ElementRef, private cdr: ChangeDetectorRef) {}

  @Input()
  public dropdownClassNames: string = '';

  @Input()
  public isOpen!: boolean;

  @Input()
  public onClose: () => void = () => {};

  @Input()
  public openComponentRef!: ElementRef;

  @Output()
  public onClickOutise: EventEmitter<MouseEvent> = new EventEmitter();

  @Output()
  public onEscape: EventEmitter<KeyboardEvent> = new EventEmitter();

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    if (
      this.ref.nativeElement &&
      this.openComponentRef.nativeElement &&
      !this.openComponentRef.nativeElement.contains(event.target as Node) &&
      !this.ref.nativeElement.contains(event.target as Node)
    ) {
      console.log(this.isOpen);
      this.onClickOutise.emit(event);
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleEscape(event: KeyboardEvent): void {
    if (event.keyCode === 27) {
      this.onEscape.emit(event);
    }
  }
}
