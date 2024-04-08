import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { co } from '@fullcalendar/core/internal-common';
import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'shared-dropdown',
  templateUrl: './dropdown.component.html',
  animations: [
    trigger('fadeInFromTop', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-16px)' }),
        animate(
          '500ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('fadeOutToTop', [
      transition(':leave', [
        animate(
          '500ms ease-out',
          style({ opacity: 0, transform: 'translateY(-16px)' })
        ),
      ]),
    ]),
  ],
})
export class DropdownComponent {
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

  constructor(private ref: ElementRef, private cdr: ChangeDetectorRef) {}

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    if (
      this.ref.nativeElement &&
      this.openComponentRef.nativeElement &&
      !this.openComponentRef.nativeElement.contains(event.target as Node) &&
      !this.ref.nativeElement.contains(event.target as Node)
    ) {
      this.onClickOutise.emit(event);
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleEscape(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isOpen) {
      this.onEscape.emit(event);
    }
  }
}
