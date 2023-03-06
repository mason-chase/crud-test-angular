import { Component, Input, OnInit } from '@angular/core';
import {Client} from '../../Client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit{
  @Input() client!: Client;

  constructor () {}

  ngOnInit(): void { }

}
