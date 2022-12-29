import { AfterViewInit, Directive, DoCheck, ElementRef, Input, Renderer2 } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { InputValidationInterface } from './input-validation.interface';

@Directive({
  selector: '[appBootstrapInputFeedback]',
})
export class BootstrapInputFeedbackDirective implements AfterViewInit, DoCheck {
  @Input() appBootstrapInputFeedback!: AbstractControl;
  @Input() validationMessages!: InputValidationInterface;
  @Input() containerClass: string[] = ['invalid-feedback'];

  _validationMessages: InputValidationInterface = {
    required: `This field is required.`,
    email: `Invalid email address.`,
    notEquivalent: `Passwords does not match.`,
    minlength: `Please insert this field with true length`,
    maxlength: `Please insert this field with true length`,
    pattern: `Please insert valid format`,
  };

  _errorElements: any = {};

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    for (const classItem of this.containerClass) {
      this.renderer.addClass(this.el.nativeElement, classItem);
    }

    this._validationMessages = { ...this._validationMessages, ...this.validationMessages };
  }

  ngDoCheck(): void {
    if (this.appBootstrapInputFeedback?.errors) {
      for (let child in this._errorElements) {
        if (!this.appBootstrapInputFeedback.errors.hasOwnProperty(child)) {
          this.renderer.removeChild(this.el.nativeElement, this._errorElements[child]);
          delete this._errorElements[child];
        }
      }

      for (let index in this.appBootstrapInputFeedback.errors) {
        if (this._errorElements[index]) {
          continue;
        }
        if (this._validationMessages[index]) {
          this._errorElements[index] = this.renderer.createElement('div');
          const errorText = this.renderer.createText(this._validationMessages[index]);
          this.renderer.appendChild(this._errorElements[index], errorText);
          this.renderer.appendChild(this.el.nativeElement, this._errorElements[index]);
        }
      }
    } else {
      for (let child in this._errorElements) {
        this.renderer.removeChild(this.el.nativeElement, this._errorElements[child]);
        delete this._errorElements[child];
      }
    }
  }
}
