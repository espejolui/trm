import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTrmComponent } from './chart-trm.component';

describe('ChartTrmComponent', () => {
  let component: ChartTrmComponent;
  let fixture: ComponentFixture<ChartTrmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartTrmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartTrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
