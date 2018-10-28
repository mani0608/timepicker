import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MClockComponent } from './m-clock.component';

describe('MClockComponent', () => {
  let component: MClockComponent;
  let fixture: ComponentFixture<MClockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MClockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
