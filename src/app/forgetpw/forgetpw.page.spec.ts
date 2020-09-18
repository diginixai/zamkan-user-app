import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForgetpwPage } from './forgetpw.page';

describe('ForgetpwPage', () => {
  let component: ForgetpwPage;
  let fixture: ComponentFixture<ForgetpwPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetpwPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ForgetpwPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
