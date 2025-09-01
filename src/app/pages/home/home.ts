import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Articles } from '../../services/articles';
import { ArticleType } from '../../types/article.type';
import { catchError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Card } from "../../components/card/card";

@Component({
  selector: 'app-home',
  imports: [FormsModule, MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, Card],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  articleService = inject(Articles);
  articleItems = signal<ArticleType[]>([]);
  filteredArticleItems = signal<ArticleType[]>([]);
  searchQuery = signal('');
  articleCount = signal(this.articleItems().length);

  ngOnInit(): void {
    this.articleService
      .getArticlesFromApi()
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((articlesFromApi) => {
        this.articleItems.set(articlesFromApi.results);
        this.articleCount.set(articlesFromApi.results.length);
        this.filteredArticleItems.set(articlesFromApi.results);
      });
  }

  constructor() {
    // check if search query is updated and then filter articles
    effect(() => {
      if (!this.searchQuery) {
        this.filteredArticleItems.set(this.articleItems());
        this.articleCount.set(this.articleItems().length);
      } else {
        const filteredByTitle = this.articleItems().filter((article) => {
          return article.title.toLowerCase().includes(this.searchQuery().toLowerCase());
        });

        const filteredByDescription = this.articleItems().filter((article) => {
          return article.summary.toLowerCase().includes(this.searchQuery().toLowerCase());
        });

        const filteredArticles = filteredByDescription.reduce((acc, articleFromDesc) => {
          if (!acc.some((articleFromTitle) => articleFromTitle.id === articleFromDesc.id)) {
            acc.push(articleFromDesc);
          }
          return acc;
        }, filteredByTitle);
        this.filteredArticleItems.set(filteredArticles);
        this.articleCount.set(filteredArticles.length);
      }
    });
  }
}
