import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthorisationsComponent } from './user-authorisations.component';

describe('UserAuthorisationsComponent', () => {
  let component: UserAuthorisationsComponent;
  let fixture: ComponentFixture<UserAuthorisationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAuthorisationsComponent]
    });
    fixture = TestBed.createComponent(UserAuthorisationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
