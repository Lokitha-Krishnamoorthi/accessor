import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';
  errorMessages = { required: 'The First Name field is required' };
  errorMessagesl = { required: 'The Last Name field is required' };
  
  appearance: MatFormFieldAppearance = 'fill'; 
  appearance1: MatFormFieldAppearance = 'outline'; 
  
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      console.log('Form submitted successfully!');
      console.log('Form values:', this.formGroup.value);

      Object.keys(this.formGroup.controls).forEach(controlName => {
        const control = this.formGroup.get(controlName);
        console.log(`Control: ${controlName}`);
        console.log(`Dirty: ${control?.dirty}`);
        console.log(`Touched: ${control?.touched}`);
        console.log(`Invalid: ${control?.invalid}`);
      });
    } else {
      console.log('Form is invalid.');
    }
  }
}
