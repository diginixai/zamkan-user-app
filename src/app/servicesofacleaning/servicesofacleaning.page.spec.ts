import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicesofacleaningPage } from './servicesofacleaning.page';

describe('ServicesofacleaningPage', () => {
  let component: ServicesofacleaningPage;
  let fixture: ComponentFixture<ServicesofacleaningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesofacleaningPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesofacleaningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
