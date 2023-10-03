import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';

interface ControlState {
  value: any;
  dirty: boolean;
  touched: boolean;
  invalid: boolean;
  disabled: boolean;
}

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
  formOutput: any;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
    });
  }

  inputfieldChange(value: FormControl) {
    console.log(value.parent?.controls);
    this.formOutput = value.parent?.controls;
  }


  onSubmit() {
    if (this.formOutput) {
      console.log('Form submitted successfully!');
      console.log('Form values:', this.formGroup.value);
  
     // Update the control name from 'firstname' to 'fname'
     this.formGroup.addControl('fname', this.formGroup.get('firstname'));
     this.formGroup.removeControl('firstname');
     this.formGroup.addControl('age', new FormControl('', [Validators.required]));

     // Set the form values here directly
     this.formGroup.setValue({
       fname: 'loki',
       lastname: 'loki',
       age: 20
     });
      const controlStates: { [key: string]: ControlState } = {};
      
      for (const controlName in this.formOutput) {
        if (this.formOutput.hasOwnProperty(controlName)) {
          controlStates[controlName] = this.getControlState(this.formOutput[controlName]);
        }
      }

      console.log('Control States:', controlStates);
    } else {
      console.log('Form is invalid. Please fix the errors.');
    }
  }

  private getControlState(control: FormControl): ControlState {
    return {
      value: control.value,
      dirty: control.dirty,
      touched: control.touched,
      invalid: control.invalid,
      disabled: control.disabled,
    };
  }
}
