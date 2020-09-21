import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServiceelectricianPage } from './serviceelectrician.page';

describe('ServiceelectricianPage', () => {
  let component: ServiceelectricianPage;
  let fixture: ComponentFixture<ServiceelectricianPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceelectricianPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceelectricianPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
