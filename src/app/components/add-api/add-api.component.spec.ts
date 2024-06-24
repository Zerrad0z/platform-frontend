import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApiComponent } from './add-api.component';

describe('AddApiComponent', () => {
  let component: AddApiComponent;
  let fixture: ComponentFixture<AddApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddApiComponent]
    });
    fixture = TestBed.createComponent(AddApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
