import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileCardItem } from './mobile-card-item';

describe('MobileCardItem', () => {
  let component: MobileCardItem;
  let fixture: ComponentFixture<MobileCardItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileCardItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileCardItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
