import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEndDateDialogComponent } from './edit-end-date-dialog.component';

describe('EditEndDateDialogComponent', () => {
  let component: EditEndDateDialogComponent;
  let fixture: ComponentFixture<EditEndDateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEndDateDialogComponent]
    });
    fixture = TestBed.createComponent(EditEndDateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
