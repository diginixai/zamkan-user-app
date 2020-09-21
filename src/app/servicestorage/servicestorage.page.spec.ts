import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicestoragePage } from './servicestorage.page';

describe('ServicestoragePage', () => {
  let component: ServicestoragePage;
  let fixture: ComponentFixture<ServicestoragePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicestoragePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicestoragePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
