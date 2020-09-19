import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountchangepwPage } from './accountchangepw.page';

describe('AccountchangepwPage', () => {
  let component: AccountchangepwPage;
  let fixture: ComponentFixture<AccountchangepwPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountchangepwPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountchangepwPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
