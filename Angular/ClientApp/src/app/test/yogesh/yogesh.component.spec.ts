import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YogeshComponent } from './yogesh.component';

describe('YogeshComponent', () => {
  let component: YogeshComponent;
  let fixture: ComponentFixture<YogeshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YogeshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YogeshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
