import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SeriesComponent } from './series.component';
import { MarvelAPIService } from '../Service/marvel-api.service';

const mockService = {
  allSeries: () => of({ data: { count: 0, results: [] } }),
};

describe('SeriesComponent', () => {
  let component: SeriesComponent;
  let fixture: ComponentFixture<SeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeriesComponent],
      providers: [{ provide: MarvelAPIService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
