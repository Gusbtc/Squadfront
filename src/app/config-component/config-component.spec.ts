import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Conf } from './config-component';

describe('Conf', () => {
  let component: Conf;
  let fixture: ComponentFixture<Conf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Conf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Conf);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
