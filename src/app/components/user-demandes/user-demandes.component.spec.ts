import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDemandesComponent } from './user-demandes.component';

describe('UserDemandesComponent', () => {
  let component: UserDemandesComponent;
  let fixture: ComponentFixture<UserDemandesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDemandesComponent]
    });
    fixture = TestBed.createComponent(UserDemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
