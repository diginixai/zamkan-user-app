import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookingupdatePage } from './bookingupdate.page';

describe('BookingupdatePage', () => {
  let component: BookingupdatePage;
  let fixture: ComponentFixture<BookingupdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingupdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingupdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
