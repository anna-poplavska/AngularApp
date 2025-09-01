import { Component, inject, OnInit, signal } from '@angular/core';
import { Articles } from '../../services/articles';
import { ArticleType } from '../../types/article.type';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-article',
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './article.html',
  styleUrl: './article.scss',
})
export class Article implements OnInit {
  articleId = signal('');
  private activatedRoute = inject(ActivatedRoute);
  articleService = inject(Articles);
  article = signal<ArticleType>({
    id: 0,
    title: '',
    authors: [],
    url: '',
    image_url: '',
    news_site: '',
    summary: '',
    published_at: '',
    updated_at: '',
    featured: false,
    launches: [],
    events: [],
  });
  private router = inject(Router);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.articleId.set(params['id']);
    });
    this.articleService
      .getArticleByIdFromApi(this.articleId())
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((articleFromApi) => {
        if (articleFromApi !== null) {
          this.article.set(articleFromApi);
        } else {
          this.router.navigate(['/']);
        }
      });
  }
}
