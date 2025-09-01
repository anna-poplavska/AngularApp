import { Title } from '@angular/platform-browser';

export type ArticlesType = {
count: number;
next: string | null;
previous: string | null;
results: ArticleType[];
}

export type ArticleType = {
  id: number;
  title: string;
  authors: {
    name: string;
    socials: null;
  }[];
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
  featured: boolean;
  launches: {
    launch_id: string;
    provider: string;
  }[];
  events: {
    event_id: number;
    provider: string;
  }[];
};
