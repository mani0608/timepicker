import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MTimePickerToggleComponent } from './m-time-picker-toggle.component';

describe('MTimePickerToggleComponent', () => {
  let component: MTimePickerToggleComponent;
  let fixture: ComponentFixture<MTimePickerToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MTimePickerToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MTimePickerToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
