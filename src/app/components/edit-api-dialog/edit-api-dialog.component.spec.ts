import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditApiDialogComponent } from './edit-api-dialog.component';

describe('EditApiDialogComponent', () => {
  let component: EditApiDialogComponent;
  let fixture: ComponentFixture<EditApiDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditApiDialogComponent]
    });
    fixture = TestBed.createComponent(EditApiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
