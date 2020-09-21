import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicebookatruckPage } from './servicebookatruck.page';

describe('ServicebookatruckPage', () => {
  let component: ServicebookatruckPage;
  let fixture: ComponentFixture<ServicebookatruckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicebookatruckPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicebookatruckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
