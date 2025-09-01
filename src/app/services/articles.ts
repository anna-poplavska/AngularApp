import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ArticlesType, ArticleType } from '../types/article.type';

@Injectable({
  providedIn: 'root'
})
export class Articles {
  http = inject(HttpClient);

  getArticlesFromApi() {
    const url = 'https://api.spaceflightnewsapi.net/v4/articles/';
    return this.http.get<ArticlesType>(url);
  }

  getArticleByIdFromApi(articleId: string) {
    const url = `https://api.spaceflightnewsapi.net/v4/articles/${articleId}`;
    return this.http.get<ArticleType>(url);
  }
}
