import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockDriverComponent } from './block-driver.component';

describe('BlockDriverComponent', () => {
  let component: BlockDriverComponent;
  let fixture: ComponentFixture<BlockDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockDriverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
