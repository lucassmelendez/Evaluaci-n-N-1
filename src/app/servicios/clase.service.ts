import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClaseService {
  private totalClasesSubject = new BehaviorSubject<number>(0); // Inicializa en 0
  totalClases$ = this.totalClasesSubject.asObservable();

  incrementarClases() {
    const nuevoTotal = this.totalClasesSubject.value + 1;
    this.totalClasesSubject.next(nuevoTotal);
  }

  getTotalClases(): number {
    return this.totalClasesSubject.value;
  }
}
