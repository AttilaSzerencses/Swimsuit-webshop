import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: number, ...args: string[]): string {
    let date=new Date(value);
    let formatedDate=date.toISOString().replace('Z', '').replace('T', ' ').split('.')[0];
    return formatedDate;
  }

}
