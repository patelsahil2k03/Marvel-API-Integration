import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AllCharactersComponent } from './all-characters.component';
import { MarvelAPIService } from '../Service/marvel-api.service';

const mockService = {
  allCharacters: () => of({ data: { count: 0, results: [] } }),
  allComics: () => of({ data: { count: 0, results: [] } }),
  allSeries: () => of({ data: { count: 0, results: [] } }),
  getComicsByCharacter: () => of({ data: { count: 0, results: [] } }),
  getSeriesByCharacter: () => of({ data: { count: 0, results: [] } }),
  getCharacterByName: () => of({ data: { count: 0, results: [] } }),
};

describe('AllCharactersComponent', () => {
  let component: AllCharactersComponent;
  let fixture: ComponentFixture<AllCharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllCharactersComponent],
      providers: [{ provide: MarvelAPIService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AllCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
