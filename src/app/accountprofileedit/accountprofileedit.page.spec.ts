import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountprofileeditPage } from './accountprofileedit.page';

describe('AccountprofileeditPage', () => {
  let component: AccountprofileeditPage;
  let fixture: ComponentFixture<AccountprofileeditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountprofileeditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountprofileeditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
