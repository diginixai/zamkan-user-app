import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicehomecleaningPage } from './servicehomecleaning.page';

describe('ServicehomecleaningPage', () => {
  let component: ServicehomecleaningPage;
  let fixture: ComponentFixture<ServicehomecleaningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicehomecleaningPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicehomecleaningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
