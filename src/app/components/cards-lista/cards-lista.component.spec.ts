import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsListaComponent } from './cards-lista.component';

describe('CardsListaComponent', () => {
  let component: CardsListaComponent;
  let fixture: ComponentFixture<CardsListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
