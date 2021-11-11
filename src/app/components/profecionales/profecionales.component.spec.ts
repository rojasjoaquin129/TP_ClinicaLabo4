import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfecionalesComponent } from './profecionales.component';

describe('ProfecionalesComponent', () => {
  let component: ProfecionalesComponent;
  let fixture: ComponentFixture<ProfecionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfecionalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfecionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
