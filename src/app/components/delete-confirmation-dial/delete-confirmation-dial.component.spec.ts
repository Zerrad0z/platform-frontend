import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationDialComponent } from './delete-confirmation-dial.component';

describe('DeleteConfirmationDialComponent', () => {
  let component: DeleteConfirmationDialComponent;
  let fixture: ComponentFixture<DeleteConfirmationDialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteConfirmationDialComponent]
    });
    fixture = TestBed.createComponent(DeleteConfirmationDialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
