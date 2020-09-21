import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicehandymanPage } from './servicehandyman.page';

describe('ServicehandymanPage', () => {
  let component: ServicehandymanPage;
  let fixture: ComponentFixture<ServicehandymanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicehandymanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicehandymanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
