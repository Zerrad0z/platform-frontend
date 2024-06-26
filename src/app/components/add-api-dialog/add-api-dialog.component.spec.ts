import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApiDialogComponent } from './add-api-dialog.component';

describe('AddApiDialogComponent', () => {
  let component: AddApiDialogComponent;
  let fixture: ComponentFixture<AddApiDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddApiDialogComponent]
    });
    fixture = TestBed.createComponent(AddApiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
