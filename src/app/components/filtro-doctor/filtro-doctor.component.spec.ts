import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroDoctorComponent } from './filtro-doctor.component';

describe('FiltroDoctorComponent', () => {
  let component: FiltroDoctorComponent;
  let fixture: ComponentFixture<FiltroDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
