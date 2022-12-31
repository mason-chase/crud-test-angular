import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localDate'
})
export class LocalDatePipe implements PipeTransform {

  transform(value: Date, format?: string): unknown {
    if (format) {
      switch (format) {
        case `full`:
          return new Date(value).toLocaleString('fa-IR-u-nu-latn').replace('،', ' - ').slice(0, -3);
        case `date`:
          return new Date(value).toLocaleDateString('fa-IR-u-nu-latn');
      }
    }
    return new Date(value).toLocaleDateString('fa-IR-u-nu-latn');
  }

}
