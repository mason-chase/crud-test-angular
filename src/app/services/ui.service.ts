import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddClient: boolean = false;
  private subject = new Subject<any>();

  constructor() { }

  toggleAddClient(): void { 
    this.showAddClient = !this.showAddClient;
    this.subject.next(this.showAddClient);
  }

  onToggle(): Observable<any> { 
    return this.subject.asObservable();
  }
}
