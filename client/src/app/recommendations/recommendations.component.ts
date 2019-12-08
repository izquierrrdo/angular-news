import {Component, Input, OnInit} from '@angular/core';
import {NewsItem, NewsService} from '../news.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {

  recommendations: NewsItem[] = [];
  loading = false;
  dataLoadingError = '';
  @Input() id: number;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.getRecommendations(this.id);
  }

  getRecommendations(id: number) {
    this.loading = true;
    this.newsService.getRecommendations(id)
        .subscribe(recommendations => {
          this.recommendations = recommendations;
          this.loading = false;
        }, dataLoadingError => {
          console.log(dataLoadingError.message);
          this.dataLoadingError = 'Ошибка загрузки данных: ' + dataLoadingError.message;
        });
  }

}
