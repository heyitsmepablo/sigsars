import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Boletim } from './boletim';

describe('Boletim', () => {
  let component: Boletim;
  let fixture: ComponentFixture<Boletim>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Boletim]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Boletim);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
