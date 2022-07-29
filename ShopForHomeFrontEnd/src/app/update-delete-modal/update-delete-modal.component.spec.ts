import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeleteModalComponent } from './update-delete-modal.component';

describe('UpdateDeleteModalComponent', () => {
  let component: UpdateDeleteModalComponent;
  let fixture: ComponentFixture<UpdateDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDeleteModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
