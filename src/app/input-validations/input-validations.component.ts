import { Component,Input, OnChanges, SimpleChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-input-validations',
  templateUrl: './input-validations.component.html',
  styleUrls: ['./input-validations.component.scss']
})
export class InputValidationsComponent implements OnChanges {
  @Input() errors: Record<string, ValidationErrors> | null = {};
  @Input() customErrorMessages: Record<string, string> = {};
  errorMessages: Record<string, string> = {
    required: 'This field is required',
  };

  ngOnChanges(changes: SimpleChanges): void {
    const { customErrorMessages } = changes;
    if (customErrorMessages) {
      this.errorMessages = {
        ...this.errorMessages,
        ...customErrorMessages.currentValue,
      };
    }
  }
}
