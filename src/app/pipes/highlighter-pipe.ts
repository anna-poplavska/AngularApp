import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlighter'
})
export class HighlighterPipe implements PipeTransform {
  sanitizer: any;

  transform(text: string, searchQuery: string): string {
    if (!searchQuery) {
      return text;
    }

    const re = new RegExp(searchQuery, 'gi');
    const match = text.match(re);

    if (!match) {
      return text;
    }

    const value = text.replace(re, "<span class='highlight-text'>" + match[0] + "</span>");
    return value;
  }

}
