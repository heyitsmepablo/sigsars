import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletimSindomeGripal } from './boletim-sindome-gripal';

describe('BoletimSindomeGripal', () => {
  let component: BoletimSindomeGripal;
  let fixture: ComponentFixture<BoletimSindomeGripal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoletimSindomeGripal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoletimSindomeGripal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
