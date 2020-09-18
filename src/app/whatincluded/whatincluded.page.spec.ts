import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WhatincludedPage } from './whatincluded.page';

describe('WhatincludedPage', () => {
  let component: WhatincludedPage;
  let fixture: ComponentFixture<WhatincludedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatincludedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WhatincludedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
