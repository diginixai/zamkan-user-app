import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServiceplumberPage } from './serviceplumber.page';

describe('ServiceplumberPage', () => {
  let component: ServiceplumberPage;
  let fixture: ComponentFixture<ServiceplumberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceplumberPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceplumberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
