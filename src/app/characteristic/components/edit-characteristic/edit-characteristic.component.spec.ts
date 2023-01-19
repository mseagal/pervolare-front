import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCharacteristicComponent } from './edit-characteristic.component';

describe('EditCharacteristicComponent', () => {
  let component: EditCharacteristicComponent;
  let fixture: ComponentFixture<EditCharacteristicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCharacteristicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditCharacteristicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
