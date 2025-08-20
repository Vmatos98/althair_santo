import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Artesas } from './artesas';

describe('Artesas', () => {
  let component: Artesas;
  let fixture: ComponentFixture<Artesas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Artesas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Artesas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
