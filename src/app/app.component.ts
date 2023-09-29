import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'control value accessor';
  errorMessages = { required: 'The First Name field is required' };
  errorMessagesl = { required: 'The Last Name field is required' };

  appearance: MatFormFieldAppearance = 'fill';
  appearance1: MatFormFieldAppearance = 'outline';

  formGroup: FormGroup;
  formOutput: FormGroup;  

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
    });

    this.formOutput = this.fb.group({
      firstname: [''], 
      lastname: [''],  
    });
  }

  inputfieldChange(value: FormControl) {
    const controls = value.parent?.controls ?? {}; 
    this.formOutput.patchValue(controls);
  }
  

  onSubmit() {
    if (this.formOutput.valid) {
      console.log('Form submitted successfully!');
      console.log('Form Output:', this.formOutput.value);
      
    } else {
      console.log('Form is invalid. Please fix the errors.');
    }
  }
}
