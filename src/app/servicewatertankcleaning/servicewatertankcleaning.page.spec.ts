import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicewatertankcleaningPage } from './servicewatertankcleaning.page';

describe('ServicewatertankcleaningPage', () => {
  let component: ServicewatertankcleaningPage;
  let fixture: ComponentFixture<ServicewatertankcleaningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicewatertankcleaningPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicewatertankcleaningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
