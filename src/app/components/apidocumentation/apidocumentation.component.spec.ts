import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApidocumentationComponent } from './apidocumentation.component';

describe('ApidocumentationComponent', () => {
  let component: ApidocumentationComponent;
  let fixture: ComponentFixture<ApidocumentationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApidocumentationComponent]
    });
    fixture = TestBed.createComponent(ApidocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
