import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {NewsItem, NewsService} from '../news.service';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {

  id: number;
  newsItem: NewsItem;
  loading = false;

  constructor(private newsService: NewsService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.loading = true;
      this.id = params.id;
      this.newsService.getById(params.id).subscribe(item => {
        this.newsItem = item;
        this.loading = false;
      });
    });
  }

  addLike() {
    let likes = this.newsItem.likes;
    let liked = this.newsItem.liked;
    liked ? likes-- : likes++;
    liked = !liked;
    this.newsService.addLike(this.id, likes, liked)
        .subscribe(newsItem => {
          this.newsItem.likes = likes;
          this.newsItem.liked = liked;
        });
  }

}
