import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUnits } from './select-units';

describe('SelectUnits', () => {
  let component: SelectUnits;
  let fixture: ComponentFixture<SelectUnits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectUnits]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectUnits);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
