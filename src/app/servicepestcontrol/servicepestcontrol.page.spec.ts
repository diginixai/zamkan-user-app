import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicepestcontrolPage } from './servicepestcontrol.page';

describe('ServicepestcontrolPage', () => {
  let component: ServicepestcontrolPage;
  let fixture: ComponentFixture<ServicepestcontrolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicepestcontrolPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicepestcontrolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
