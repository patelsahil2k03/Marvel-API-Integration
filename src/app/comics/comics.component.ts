import { Component, OnInit } from '@angular/core';
import { MarvelAPIService, MarvelComic } from '../Service/marvel-api.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css'],
})
export class ComicsComponent implements OnInit {
  allComics: MarvelComic[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private service: MarvelAPIService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.service.allComics().subscribe({
      next: (result) => {
        this.allComics = result.data.results;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load comics. Check Marvel API credentials/config.';
        this.allComics = [];
        this.isLoading = false;
      },
    });
  }

  imageUrl(path: string, extension: string): string {
    return `${path}/standard_medium.${extension}`;
  }
}
