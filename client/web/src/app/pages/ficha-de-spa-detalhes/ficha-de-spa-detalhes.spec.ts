import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaDeSpaDetalhes } from './ficha-de-spa-detalhes';

describe('FichaDeSpaDetalhes', () => {
  let component: FichaDeSpaDetalhes;
  let fixture: ComponentFixture<FichaDeSpaDetalhes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichaDeSpaDetalhes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaDeSpaDetalhes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
