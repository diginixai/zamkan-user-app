import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicemovingmyhomePage } from './servicemovingmyhome.page';

describe('ServicemovingmyhomePage', () => {
  let component: ServicemovingmyhomePage;
  let fixture: ComponentFixture<ServicemovingmyhomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicemovingmyhomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicemovingmyhomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
