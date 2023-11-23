import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnDestroy {

  public sub:Subscription=new Subscription()
  constructor() { }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}
