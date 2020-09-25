import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicecarpetcleaningPage } from './servicecarpetcleaning.page';

describe('ServicecarpetcleaningPage', () => {
  let component: ServicecarpetcleaningPage;
  let fixture: ComponentFixture<ServicecarpetcleaningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicecarpetcleaningPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicecarpetcleaningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
