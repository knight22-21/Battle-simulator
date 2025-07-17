import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureCounts } from './configure-counts';

describe('ConfigureCounts', () => {
  let component: ConfigureCounts;
  let fixture: ComponentFixture<ConfigureCounts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigureCounts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureCounts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
