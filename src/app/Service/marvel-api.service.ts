import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface MarvelImage {
  path: string;
  extension: string;
}

export interface MarvelCharacter {
  id: number;
  name: string;
  thumbnail: MarvelImage;
}

export interface MarvelComic {
  id: number;
  title: string;
  thumbnail: MarvelImage;
}

export interface MarvelSeries {
  id: number;
  title: string;
  thumbnail: MarvelImage;
}

export interface MarvelApiResponse<T> {
  data: {
    count: number;
    results: T[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class MarvelAPIService {
  private readonly baseUrl = environment.marvel.baseUrl;

  constructor(private http: HttpClient) {}

  private authParams(extra: Record<string, string> = {}): HttpParams {
    let params = new HttpParams()
      .set('ts', environment.marvel.ts)
      .set('apikey', environment.marvel.publicKey)
      .set('hash', environment.marvel.hash);

    Object.entries(extra).forEach(([key, value]) => {
      params = params.set(key, value);
    });

    return params;
  }

  private ensureConfigured(): void {
    if (!environment.marvel.publicKey || !environment.marvel.hash) {
      throw new Error('Marvel API credentials are missing. Configure environment files before running requests.');
    }
  }

  allCharacters(): Observable<MarvelApiResponse<MarvelCharacter>> {
    this.ensureConfigured();
    return this.http.get<MarvelApiResponse<MarvelCharacter>>(`${this.baseUrl}/characters`, {
      params: this.authParams({ limit: String(environment.marvel.defaultLimit) }),
    });
  }

  allComics(): Observable<MarvelApiResponse<MarvelComic>> {
    this.ensureConfigured();
    return this.http.get<MarvelApiResponse<MarvelComic>>(`${this.baseUrl}/comics`, {
      params: this.authParams({ limit: String(environment.marvel.defaultLimit) }),
    });
  }

  allSeries(): Observable<MarvelApiResponse<MarvelSeries>> {
    this.ensureConfigured();
    return this.http.get<MarvelApiResponse<MarvelSeries>>(`${this.baseUrl}/series`, {
      params: this.authParams({ limit: String(environment.marvel.defaultLimit) }),
    });
  }

  getComicsByCharacter(characterId: number): Observable<MarvelApiResponse<MarvelComic>> {
    this.ensureConfigured();
    return this.http.get<MarvelApiResponse<MarvelComic>>(`${this.baseUrl}/characters/${characterId}/comics`, {
      params: this.authParams(),
    });
  }

  getSeriesByCharacter(characterId: number): Observable<MarvelApiResponse<MarvelSeries>> {
    this.ensureConfigured();
    return this.http.get<MarvelApiResponse<MarvelSeries>>(`${this.baseUrl}/characters/${characterId}/series`, {
      params: this.authParams(),
    });
  }

  getCharacterByName(characterName: string): Observable<MarvelApiResponse<MarvelCharacter>> {
    this.ensureConfigured();
    return this.http.get<MarvelApiResponse<MarvelCharacter>>(`${this.baseUrl}/characters`, {
      params: this.authParams({ name: characterName.trim() }),
    });
  }
}
