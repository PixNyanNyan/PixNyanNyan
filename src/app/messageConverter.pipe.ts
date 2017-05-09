import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'messageConverter'
})
export class MessageConverterPipe implements PipeTransform {

    regex: RegExp = />>No.\d+/g;

    transform(value: string, exponent: any): String {
        if (!value)
            return '';
        return value.replace(this.regex, (match) => {
            return `<a href="${location.pathname}#r${match.substr(5)}">${match}</a>`;
        });
    }
}