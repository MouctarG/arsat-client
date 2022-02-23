import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyjson'
})
export class PrettyjsonPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return JSON.stringify(value, null, 2)
      .replace(/\n/g, '<br/>') // transformation des sauts de ligne
      .replace(/ /g, '&nbsp;') // transformation des espaces
      .replace(/:\&nbsp;"((?:[^\\"]|\\.)*)"/g, ': <span class="pretty-json string">"$1"</span>') // style des string
      .replace(/:\&nbsp;([-]?[0-9]+[.]?[0-9]*)/g, ': <span class="pretty-json number">$1</span>') // style des nombres
      .replace(/:?(null)/g, '<span class="pretty-json number">$1</span>'); // style des null
  }
}
