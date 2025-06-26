import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonMobileMenu } from './button-mobile-menu';

describe('ButtonMobileMenu', () => {
  let component: ButtonMobileMenu;
  let fixture: ComponentFixture<ButtonMobileMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonMobileMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonMobileMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
