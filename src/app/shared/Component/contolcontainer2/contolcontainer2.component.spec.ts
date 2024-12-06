import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contolcontainer2Component } from './contolcontainer2.component';

describe('Contolcontainer2Component', () => {
  let component: Contolcontainer2Component;
  let fixture: ComponentFixture<Contolcontainer2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contolcontainer2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Contolcontainer2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
