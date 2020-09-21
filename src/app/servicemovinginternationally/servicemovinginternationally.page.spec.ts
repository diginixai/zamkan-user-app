import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicemovinginternationallyPage } from './servicemovinginternationally.page';

describe('ServicemovinginternationallyPage', () => {
  let component: ServicemovinginternationallyPage;
  let fixture: ComponentFixture<ServicemovinginternationallyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicemovinginternationallyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicemovinginternationallyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
