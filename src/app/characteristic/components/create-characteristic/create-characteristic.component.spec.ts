import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCharacteristicComponent } from './create-characteristic.component';

describe('CreateCharacteristicComponent', () => {
  let component: CreateCharacteristicComponent;
  let fixture: ComponentFixture<CreateCharacteristicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCharacteristicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCharacteristicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
