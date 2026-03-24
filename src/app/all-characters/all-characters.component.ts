import { Component, OnInit } from '@angular/core';
import { MarvelAPIService, MarvelCharacter, MarvelComic, MarvelSeries } from '../Service/marvel-api.service';

@Component({
  selector: 'app-all-characters',
  templateUrl: './all-characters.component.html',
  styleUrls: ['./all-characters.component.css'],
})
export class AllCharactersComponent implements OnInit {
  allCharacters: MarvelCharacter[] = [];
  searchedCharacter: MarvelCharacter[] = [];
  comics: MarvelComic[] = [];
  series: MarvelSeries[] = [];

  showSearchResult = false;
  showComicsDiv = false;
  showSeriesDiv = false;

  isLoading = false;
  isSearchLoading = false;
  errorMessage = '';

  constructor(private service: MarvelAPIService) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  private loadCharacters(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.showSearchResult = false;

    this.service.allCharacters().subscribe({
      next: (result) => {
        this.allCharacters = result.data.results;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error?.message || 'Unable to load characters. Check Marvel API configuration.';
        this.allCharacters = [];
        this.isLoading = false;
      },
    });
  }

  fetchComicsByCharacter(characterId: number): void {
    this.showComicsDiv = false;
    this.comics = [];
    this.service.getComicsByCharacter(characterId).subscribe({
      next: (result) => {
        this.comics = result.data.results;
        this.showComicsDiv = this.comics.length > 0;
      },
      error: () => {
        this.showComicsDiv = false;
      },
    });
  }

  fetchSeriesByCharacter(characterId: number): void {
    this.showSeriesDiv = false;
    this.series = [];
    this.service.getSeriesByCharacter(characterId).subscribe({
      next: (result) => {
        this.series = result.data.results;
        this.showSeriesDiv = this.series.length > 0;
      },
      error: () => {
        this.showSeriesDiv = false;
      },
    });
  }

  findCharacter(event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim();
    this.errorMessage = '';

    if (!value) {
      this.searchedCharacter = [];
      this.showSearchResult = false;
      return;
    }

    this.isSearchLoading = true;
    this.service.getCharacterByName(value).subscribe({
      next: (result) => {
        this.searchedCharacter = result.data.results;
        this.showSearchResult = true;
        this.isSearchLoading = false;
      },
      error: () => {
        this.errorMessage = 'Character search failed. Please try again.';
        this.searchedCharacter = [];
        this.showSearchResult = false;
        this.isSearchLoading = false;
      },
    });
  }

  imageUrl(path: string, extension: string): string {
    return `${path}/standard_medium.${extension}`;
  }
}
