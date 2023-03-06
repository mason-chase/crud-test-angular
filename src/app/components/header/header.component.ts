import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() btnClick = new EventEmitter();

  constructor () {}

  ngOnInit(): void { }

  onClick() {
    this.btnClick.emit();
  }

  onSubmit() {
    console.log('test');
  }
}
