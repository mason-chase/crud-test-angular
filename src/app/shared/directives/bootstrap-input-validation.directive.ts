import { Directive, HostBinding, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appBootstrapInputValidation]',
})
export class BootstrapInputValidationDirective {
  @Input() appBootstrapInputValidation!: AbstractControl;
  @Input() checkValidate: boolean = true;
  @Input() checkInvalidate: boolean = true;

  @HostBinding('class.is-valid') get valid() {
    if (this.checkValidate) {
      return (
        this.appBootstrapInputValidation.valid &&
        (this.appBootstrapInputValidation.dirty || this.appBootstrapInputValidation.touched)
      );
    }
    return false;
  }

  @HostBinding('class.is-invalid') get invalid() {
    if (this.checkValidate) {
      return (
        this.appBootstrapInputValidation.invalid &&
        (this.appBootstrapInputValidation.dirty || this.appBootstrapInputValidation.touched)
      );
    }
    return false;
  }
}
