import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeListItemComponent } from './challenge-list-item.component';

describe('ChallengeListItemComponent', () => {
  let component: ChallengeListItemComponent;
  let fixture: ComponentFixture<ChallengeListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
