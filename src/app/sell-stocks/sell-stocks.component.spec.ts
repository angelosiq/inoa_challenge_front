import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellStocksComponent } from './sell-stocks.component';

describe('SellStocksComponent', () => {
  let component: SellStocksComponent;
  let fixture: ComponentFixture<SellStocksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellStocksComponent]
    });
    fixture = TestBed.createComponent(SellStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
