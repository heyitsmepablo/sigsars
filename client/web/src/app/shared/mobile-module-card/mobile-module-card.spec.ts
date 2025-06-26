import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileModuleCard } from './mobile-module-card';

describe('MobileModuleCard', () => {
  let component: MobileModuleCard;
  let fixture: ComponentFixture<MobileModuleCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileModuleCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileModuleCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
