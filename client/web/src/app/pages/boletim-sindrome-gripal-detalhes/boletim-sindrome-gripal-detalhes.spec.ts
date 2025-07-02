import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletimSindromeGripalDetalhes } from './boletim-sindrome-gripal-detalhes';

describe('BoletimSindromeGripalDetalhes', () => {
  let component: BoletimSindromeGripalDetalhes;
  let fixture: ComponentFixture<BoletimSindromeGripalDetalhes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoletimSindromeGripalDetalhes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoletimSindromeGripalDetalhes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
