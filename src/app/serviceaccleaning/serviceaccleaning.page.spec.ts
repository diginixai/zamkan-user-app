import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServiceaccleaningPage } from './serviceaccleaning.page';

describe('ServiceaccleaningPage', () => {
  let component: ServiceaccleaningPage;
  let fixture: ComponentFixture<ServiceaccleaningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceaccleaningPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceaccleaningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
