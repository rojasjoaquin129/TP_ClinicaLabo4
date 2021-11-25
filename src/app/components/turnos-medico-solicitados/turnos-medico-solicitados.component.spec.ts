import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosMedicoSolicitadosComponent } from './turnos-medico-solicitados.component';

describe('TurnosMedicoSolicitadosComponent', () => {
  let component: TurnosMedicoSolicitadosComponent;
  let fixture: ComponentFixture<TurnosMedicoSolicitadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosMedicoSolicitadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosMedicoSolicitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
