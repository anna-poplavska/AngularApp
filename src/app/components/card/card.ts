import { Component, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ArticleType } from '../../types/article.type';
import { Router } from '@angular/router';
import { HighlighterPipe } from '../../pipes/highlighter-pipe';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, MatIconModule, MatButtonModule, HighlighterPipe],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  article = input.required<ArticleType>();
  searchQuery = input('');
  private router = inject(Router);

  // return correct date string
  provideDate(date: string): string {
    const dateArray = date.slice(0, 10).split('-');
    if (dateArray.length === 0) {
      return '';
    }

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let day = 'th';
    if (dateArray[2] === '1') {
      day = 'st';
    } else if (dateArray[2] === '2') {
      day = 'nd';
    } else if (dateArray[2] === '3') {
      day = 'rd';
    }

    return `${months[+dateArray[1]]} ${dateArray[2] + day}, ${dateArray[0]}`;
  }

  navigateToArticle(articleId: number) {
    this.router.navigate(['/article', articleId]);
  }

  //if description is more than 100 characters, it cut it and add ...
  limitDescription(description: string) {
    if (description.length <= 100) {
      return description;
    }

    return description.substring(0, 100) + '...';
  }
}
