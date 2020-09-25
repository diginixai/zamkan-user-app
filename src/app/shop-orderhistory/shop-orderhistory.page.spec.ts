import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShopOrderhistoryPage } from './shop-orderhistory.page';

describe('ShopOrderhistoryPage', () => {
  let component: ShopOrderhistoryPage;
  let fixture: ComponentFixture<ShopOrderhistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopOrderhistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShopOrderhistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
