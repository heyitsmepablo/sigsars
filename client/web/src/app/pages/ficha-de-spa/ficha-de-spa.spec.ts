import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaDeSpa } from './ficha-de-spa';

describe('FichaDeSpa', () => {
  let component: FichaDeSpa;
  let fixture: ComponentFixture<FichaDeSpa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichaDeSpa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaDeSpa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
