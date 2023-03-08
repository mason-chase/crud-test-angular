import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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
  btnText: string = 'Add New Client'; // text of the button
  color: string = '#5989C1'; // color of the button
  showAddClient: boolean = false; 
  subscription!: Subscription;
  clientForm!: FormGroup;
  isSubmitted = false; 
  selectedClient: Client | undefined;
  appState = 'default'; // variable to store the info to select the form to update or to add a client

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

    //Create a new Form with specified validation rules
    this.clientForm = this.formBuilder.group  ({
      firstName: new FormControl ('', [Validators.required]),
      lastName: new FormControl ('', [Validators.required]),
      dateOfBirth: new FormControl ('', [Validators.required]),
      phoneNumber: new FormControl ('', 
        [Validators.required, ValidatePhone, Validators.minLength(13), Validators.maxLength(13)]),
      email: new FormControl ('', [Validators.required, Validators.email]),
      bankAccountNumber: new FormControl ('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)])
    })
  }

  ngOnInit(): void { 
    this.clients = this.clientService.getClients();
    //to activate the addForm on edit and to patch the values of the selected client to edit
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
    //to guarantee that the form is all filled
    if (!form.value.firstName || !form.value.lastName || 
      !form.value.phoneNumber ||  !form.value.bankAccountNumber || 
      !form.value.email || !form.value.dateOfBirth) 
      {
      return;
      }
    
    //to not allow to add the client in case there is some invalid information
    if (this.clientForm.invalid) {
      return;
    }

    //Verify that the information is not already in the the storage
    //Can't have client's with the same firstName + lastName + dob and the e-mail should be unique in all database
    if (this.clients.find(
      c =>
        c.firstName.toLowerCase() === form.value.firstName.toLowerCase() &&
        c.lastName.toLowerCase() === form.value.lastName.toLowerCase() &&
        c.dateOfBirth === form.value.dateOfBirth ||
        c.email === form.value.email 
      )) {
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
    this.isSubmitted = true;
  
    const newClient = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      dateOfBirth: form.value.dateOfBirth,
      phoneNumber: form.value.phoneNumber,
      email: form.value.email,
      bankAccountNumber: form.value.bankAccountNumber
    }

    //to not allow to add the client in case there is some invalid information
    if (this.clientForm.invalid) {
      return;
    }

    this.clientService.onUpdate(this.selectedClient, newClient);
    this.toggleAddClient();
    this.clientForm.reset();
    this.clientService.getClients();
  }
  // to get information about the validation errors
  get formControl(){
    return this.clientForm.controls;
  }
}


