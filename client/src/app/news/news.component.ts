import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NewsItem, NewsService} from '../news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})

export class NewsComponent implements OnInit {
  news: NewsItem[] = [];
  private observer: IntersectionObserver;
  page = 1;
  loading = false;
  @ViewChild('anchor', {static: true}) anchor: ElementRef;
  dataLoadingError = '';

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {

    const intersectionObserverOptions = {
      root: null,
      rootMargins: '0px',
      threshold: 0.9
    };

    this.observer = new IntersectionObserver((entries: any) => {
      if (entries[0].isIntersecting) {
        this.page += 1;
        this.fetchNews(this.page);
      }
    }, intersectionObserverOptions);
    this.observer.observe(this.anchor.nativeElement);
  }

  fetchNews(page: number, limit: number = 24) {
    this.loading = true;
    this.newsService.fetchNews(page, limit)
        .subscribe(news => {
          this.news = this.news.concat(news);
          this.loading = false;
        }, dataLoadingError => {
          console.log(dataLoadingError.message);
          this.dataLoadingError = 'Ошибка загрузки данных: ' + dataLoadingError.message;
        });
  }

  addLike(id: number) {
    const likedItem = this.news.find(x => x.id === id);
    let likes = likedItem.likes;
    let liked = likedItem.liked;
    liked ? likes-- : likes++;
    liked = !liked;
    this.newsService.addLike(id, likes, liked)
        .subscribe(newsItem => {
          likedItem.likes = likes;
          likedItem.liked = liked;
        });
  }

}