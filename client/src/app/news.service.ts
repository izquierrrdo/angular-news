import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {delay} from 'rxjs/operators';

export interface NewsItem {
  id: number;
  title: string;
  text: string;
  date: string;
  img: string;
  likes: number;
  liked: boolean;
}

@Injectable({providedIn: 'root'})

export class NewsService {
  constructor(private http: HttpClient) {}

  fetchNews(page: number, limit: number = 24): Observable<NewsItem[]> {
    return this.http.get<NewsItem[]>(`http://localhost:3000/news?_sort=date&_order=desc&_page=${page}&_limit=${limit}`)
        .pipe(delay(500));
  }

  getById(id: number): Observable<NewsItem> {
    return this.http.get<NewsItem>(`http://localhost:3000/news/${id}`)
        .pipe(delay(500));
  }

  getRecommendations(id: number): Observable<NewsItem[]> {
    return this.http.get<NewsItem[]>(`http://localhost:3000/news?_limit=4&_sort=likes&_order=desc&id_ne=${id}`)
        .pipe(delay(500));
  }

  addLike(id: number, likesNum: number, likedVal: boolean): Observable<NewsItem> {
    return this.http.patch<NewsItem>(`http://localhost:3000/news/${id}`, {
      likes: likesNum,
      liked: likedVal
    });
  }
}
