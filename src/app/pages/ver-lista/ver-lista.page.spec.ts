import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerListaPage } from './ver-lista.page';

describe('VerListaPage', () => {
  let component: VerListaPage;
  let fixture: ComponentFixture<VerListaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
