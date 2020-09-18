import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookingreviewPage } from './bookingreview.page';

describe('BookingreviewPage', () => {
  let component: BookingreviewPage;
  let fixture: ComponentFixture<BookingreviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingreviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingreviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
