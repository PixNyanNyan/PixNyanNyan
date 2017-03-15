import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadPostComponent } from './thread-post.component';

describe('ThreadPostComponent', () => {
  let component: ThreadPostComponent;
  let fixture: ComponentFixture<ThreadPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreadPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
