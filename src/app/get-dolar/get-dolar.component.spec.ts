import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDolarComponent } from './get-dolar.component';

describe('GetDolarComponent', () => {
  let component: GetDolarComponent;
  let fixture: ComponentFixture<GetDolarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetDolarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetDolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
