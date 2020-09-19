import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountaddressmanagePage } from './accountaddressmanage.page';

describe('AccountaddressmanagePage', () => {
  let component: AccountaddressmanagePage;
  let fixture: ComponentFixture<AccountaddressmanagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountaddressmanagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountaddressmanagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
