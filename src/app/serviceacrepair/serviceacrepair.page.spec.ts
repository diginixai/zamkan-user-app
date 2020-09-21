import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServiceacrepairPage } from './serviceacrepair.page';

describe('ServiceacrepairPage', () => {
  let component: ServiceacrepairPage;
  let fixture: ComponentFixture<ServiceacrepairPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceacrepairPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceacrepairPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
