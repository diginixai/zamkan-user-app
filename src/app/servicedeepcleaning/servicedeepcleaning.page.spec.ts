import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicedeepcleaningPage } from './servicedeepcleaning.page';

describe('ServicedeepcleaningPage', () => {
  let component: ServicedeepcleaningPage;
  let fixture: ComponentFixture<ServicedeepcleaningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicedeepcleaningPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicedeepcleaningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
