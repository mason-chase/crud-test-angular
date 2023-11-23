import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup | any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {

    this.formGroup = this.fb.group({
      email: ['example@example.com', Validators.required],
      password: ['That, is a private question', Validators.required]
    });

  }

  submit() {
    this.authService.login(this.formGroup.value).subscribe({
      next: () => {
        if (typeof window !== `undefined` && window.document) {
          window.location.replace(`/`);
        }
      },
      error: (error: any) => {
        console.log(error.toString())
      }
    });
  }

}
