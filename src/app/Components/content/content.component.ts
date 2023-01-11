import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
  providers: [MessageService],
})
export class ContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', PhoneNumberValidator('US')),
      email: new FormControl('', [Validators.required, Validators.email]),
      bankAccountNumber: new FormControl('', Validators.required),
    })
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'is not valid form' });
  }

}
