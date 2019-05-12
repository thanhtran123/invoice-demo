import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterPipe',
})
export class FilterPipe implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (el: any) {
                if (!input || input.trim() == '')
                  return true;
                if (typeof(el) == 'string') {
                  return el.toLowerCase().indexOf(input.toLowerCase().trim()) > -1;
                } else if (typeof(el) == 'object') {
                  var keys = Object.keys(el);
                  for (var i = 0; i < keys.length; i++) {
                    if ((el[keys[i]] + '').toLowerCase().indexOf(input.toLowerCase().trim()) > -1) {
                      return true;
                    }
                  }
                  return false;
                }
                return true;
            })
        }
        return value;
    }
}
