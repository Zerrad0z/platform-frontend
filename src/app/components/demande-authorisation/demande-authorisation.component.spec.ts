import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeAuthorisationComponent } from './demande-authorisation.component';

describe('DemandeAuthorisationComponent', () => {
  let component: DemandeAuthorisationComponent;
  let fixture: ComponentFixture<DemandeAuthorisationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandeAuthorisationComponent]
    });
    fixture = TestBed.createComponent(DemandeAuthorisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
