import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicemoveinpaintingPage } from './servicemoveinpainting.page';

describe('ServicemoveinpaintingPage', () => {
  let component: ServicemoveinpaintingPage;
  let fixture: ComponentFixture<ServicemoveinpaintingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicemoveinpaintingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicemoveinpaintingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
