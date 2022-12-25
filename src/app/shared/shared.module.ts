import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootstrapInputValidationDirective } from './directives/bootstrap-input-validation.directive';
import { BootstrapInputFeedbackDirective } from './directives/bootstrap-input-feedback.directive';

@NgModule({
  declarations: [
    BootstrapInputValidationDirective,
    BootstrapInputFeedbackDirective,
  ],
  imports: [CommonModule],
  exports: [BootstrapInputValidationDirective, BootstrapInputFeedbackDirective],
})
export class SharedModule {}
