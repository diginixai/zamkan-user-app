import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicepaintingcustomPage } from './servicepaintingcustom.page';

describe('ServicepaintingcustomPage', () => {
  let component: ServicepaintingcustomPage;
  let fixture: ComponentFixture<ServicepaintingcustomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicepaintingcustomPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicepaintingcustomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
