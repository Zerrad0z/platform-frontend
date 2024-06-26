import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeNameDialogComponent } from './change-name-dialog.component';

describe('ChangeNameDialogComponent', () => {
  let component: ChangeNameDialogComponent;
  let fixture: ComponentFixture<ChangeNameDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeNameDialogComponent]
    });
    fixture = TestBed.createComponent(ChangeNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
