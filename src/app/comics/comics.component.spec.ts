import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ComicsComponent } from './comics.component';
import { MarvelAPIService } from '../Service/marvel-api.service';

const mockService = {
  allComics: () => of({ data: { count: 0, results: [] } }),
};

describe('ComicsComponent', () => {
  let component: ComicsComponent;
  let fixture: ComponentFixture<ComicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComicsComponent],
      providers: [{ provide: MarvelAPIService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ComicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
