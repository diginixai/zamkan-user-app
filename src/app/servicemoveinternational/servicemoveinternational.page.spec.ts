import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicemoveinternationalPage } from './servicemoveinternational.page';

describe('ServicemoveinternationalPage', () => {
  let component: ServicemoveinternationalPage;
  let fixture: ComponentFixture<ServicemoveinternationalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicemoveinternationalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicemoveinternationalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
