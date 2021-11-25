import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosMedicoFinalizadosComponent } from './turnos-medico-finalizados.component';

describe('TurnosMedicoFinalizadosComponent', () => {
  let component: TurnosMedicoFinalizadosComponent;
  let fixture: ComponentFixture<TurnosMedicoFinalizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosMedicoFinalizadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosMedicoFinalizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
