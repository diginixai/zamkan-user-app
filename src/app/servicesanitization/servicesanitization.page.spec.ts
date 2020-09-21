import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicesanitizationPage } from './servicesanitization.page';

describe('ServicesanitizationPage', () => {
  let component: ServicesanitizationPage;
  let fixture: ComponentFixture<ServicesanitizationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesanitizationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesanitizationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
