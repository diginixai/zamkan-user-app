import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServiceappliancerepairPage } from './serviceappliancerepair.page';

describe('ServiceappliancerepairPage', () => {
  let component: ServiceappliancerepairPage;
  let fixture: ComponentFixture<ServiceappliancerepairPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceappliancerepairPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceappliancerepairPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
