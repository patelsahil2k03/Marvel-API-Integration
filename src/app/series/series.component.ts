import { Component, OnInit } from '@angular/core';
import { MarvelAPIService, MarvelSeries } from '../Service/marvel-api.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css'],
})
export class SeriesComponent implements OnInit {
  allSeries: MarvelSeries[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private service: MarvelAPIService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.service.allSeries().subscribe({
      next: (result) => {
        this.allSeries = result.data.results;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load series. Check Marvel API credentials/config.';
        this.allSeries = [];
        this.isLoading = false;
      },
    });
  }

  imageUrl(path: string, extension: string): string {
    return `${path}/standard_medium.${extension}`;
  }
}
