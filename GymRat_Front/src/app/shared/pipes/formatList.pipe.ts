import { TitleCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatList',
})
export class FormatListPipe implements PipeTransform {
  transform(value: string[], ...args: string[]) {
    return value
      .map((v) => new TitleCasePipe().transform(v))
      .join(', ')
      .replace('_', ' ');
  }
}
