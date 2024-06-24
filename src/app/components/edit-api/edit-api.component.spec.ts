import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditApiComponent } from './edit-api.component';

describe('EditApiComponent', () => {
  let component: EditApiComponent;
  let fixture: ComponentFixture<EditApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditApiComponent]
    });
    fixture = TestBed.createComponent(EditApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
