import { Component } from '@angular/core';
import { PhoneNumberUtil } from 'google-libphonenumber';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'crud-test-angular-latest';
  internationalNumber = '+34654694651';
  dialCountry: any;

  ngOnInit() {
    this.handleNumberChange();
  }
  handleNumberChange() {
    const phoneUtil = PhoneNumberUtil.getInstance();
    const parsedInput = phoneUtil.parseAndKeepRawInput(
      this.internationalNumber
    );
    if (parsedInput.getNationalNumber() && parsedInput.getCountryCode()) {
      this.dialCountry = parsedInput;
    } else {
      this.dialCountry = null;
    }
  }

  test() {
    console.log(PhoneNumberUtil.getInstance().parseAndKeepRawInput(this.internationalNumber).getCountryCodeOrDefault());
  }
}
