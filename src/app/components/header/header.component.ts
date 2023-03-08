import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ClientService } from '../../services/client.service';
import { UiService } from '../../services/ui.service';
import { Client } from '../../Client'
import { ValidatePhone } from 'src/app/ValidatePhone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  clients!: Client[];
  btnText: string = 'Add New Client';
  color: string = '#5989C1';
  showAddClient: boolean = false;
  subscription!: Subscription;
  clientForm!: FormGroup;
  isSubmitted = false;
  selectedClient: Client | undefined;
  appState = 'default';

  constructor (
      private clientService: ClientService, 
      private uiService: UiService, 
      private formBuilder: FormBuilder
    ) {
    this.subscription = this.uiService
          .onToggle()
          .subscribe(value => {
            this.showAddClient = value; 
            this.btnText = this.showAddClient ? 'Close' : 'Add New Client'
            this.color = this.showAddClient ? '#C15959' : '#5989C1'});

    this.clientForm = this.formBuilder.group  ({
      firstName: new FormControl ('', [Validators.required]),
      lastName: new FormControl ('', [Validators.required]),
      dateOfBirth: new FormControl ('', [Validators.required]),
      phoneNumber: new FormControl ('', 
        [Validators.required, ValidatePhone, Validators.minLength(13), Validators.maxLength(13)]),
      email: new FormControl ('', [Validators.required, Validators.email]),
      bankAccountNumber: new FormControl ('', [Validators.required, Validators.minLength(9), Validators.maxLength(10)])
    })
  }

  ngOnInit(): void { 
    this.clients = this.clientService.getClients();
    this.clientService.client.subscribe(client => {
      this.toggleAddClient();
      this.selectedClient = client;
      this.appState = 'edit';
      this.clientForm.patchValue({
        firstName: client.firstName,
        lastName: client.lastName,
        dateOfBirth: client.dateOfBirth,
        phoneNumber: client.phoneNumber,
        email: client.email,
        bankAccountNumber: client.bankAccountNumber
      });
    })
  }

  toggleAddClient() {
    this.uiService.toggleAddClient();
    this.clientService.getClients();
  }

  addClient(form: FormGroup) {
    this.isSubmitted = true;

    if (!form.value.firstName || !form.value.lastName || 
      !form.value.phoneNumber ||  !form.value.bankAccountNumber || 
      !form.value.email || !form.value.dateOfBirth) 
      {
      alert('Please fill the form')
      return;
      }

    if (this.clientForm.invalid) {
      alert('Some information is not valid. Please rectify')
      return;
    }

    if (this.clients.filter(
      c =>
        c.firstName.toLowerCase() === form.value.firstName.toLowerCase() &&
        c.lastName.toLowerCase() === form.value.lastName.toLowerCase() &&
        c.dateOfBirth === form.value.dateOfBirth ||
        c.email === form.value.email 
        //&& c !== this.selectedClient
      ).length > 0) {
      alert('This client is already in the database');
      return;
    } 

    const newClient = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      dateOfBirth: form.value.dateOfBirth,
      phoneNumber: form.value.phoneNumber,
      email: form.value.email,
      bankAccountNumber: form.value.bankAccountNumber
    }

    this.clientService.addClient(newClient);
    this.clientForm.reset();
    this.toggleAddClient();
    this.clientService.getClients();
  }

  updateClient(form: FormGroup) {

    const newClient = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      dateOfBirth: form.value.dateOfBirth,
      phoneNumber: form.value.phoneNumber,
      email: form.value.email,
      bankAccountNumber: form.value.bankAccountNumber
    }

    this.clientService.onUpdate(this.selectedClient, newClient);
    this.toggleAddClient();
    this.clientService.getClients();
  }
}


