import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeUserEditComponent } from './challenge-user-edit.component';

describe('ChallengeUserEditComponent', () => {
  let component: ChallengeUserEditComponent;
  let fixture: ComponentFixture<ChallengeUserEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeUserEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
