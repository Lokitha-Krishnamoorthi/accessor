import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{

  title = 'control value accessor';
  errorMessages = { required: 'The First Name field is required' };
  errorMessagesl = { required: 'The Last Name field is required' };

  appearance: MatFormFieldAppearance = 'fill';
  appearance1: MatFormFieldAppearance = 'outline';

  formGroup: FormGroup;

  private formSubscription: Subscription;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
          firstname: ['', [Validators.required]],
          lastname: ['', [Validators.required]],
        });
    
    // Subscribe to form control value changes
    this.formSubscription = this.formGroup.valueChanges.subscribe(value => {

      //setvalue
      const modifiedValue = value.lastname.toUpperCase();
      const firstnameControl = this.formGroup.get('lastname');
      if (firstnameControl) {
        firstnameControl.setValue(modifiedValue, { emitEvent: false });
      } else {
        console.error("Control 'lastname' not found in the formGroup.");
      }


      console.log('Form control values changed:', this.formGroup.value);
    });
  }
  disableControl() {
    const control = this.formGroup.get('firstname');
    if (control) {
      control.disable();
    } else {
      console.error("Control 'firstname' not found in the formGroup.");
    }
  }

  enableControl() {
    const control = this.formGroup.get('firstname');
    if (control) {
      control.enable();
    } else {
      console.error("Control 'firstname' not found in the formGroup.");
    }
  }
  markControlAsDirty(controlName: string) {
    const control = this.formGroup.get(controlName);
    if (control) {
      control.markAsDirty();
    } else {
      console.error(`Control '${controlName}' not found in the formGroup.`);
    }
  }
  markControlAsPristine(controlName: string) {
    const control = this.formGroup.get(controlName);
    if (control) {
      control.markAsPristine();
    } else {
      console.error(`Control '${controlName}' not found in the formGroup.`);
    }
  }
 
  private logFormGroupState() {
    console.log('FormGroup State:');
    console.log('Dirty:', this.formGroup.dirty);
    console.log('Pristine:', this.formGroup.pristine);
    console.log('Disabled:', this.formGroup.disabled);
    console.log('Invalid:', this.formGroup.invalid);
    console.log('Touched:', this.formGroup.touched);
    // Loop through controls to log their states
    for (const controlName in this.formGroup.controls) {
      if (this.formGroup.controls.hasOwnProperty(controlName)) {
        const control = this.formGroup.get(controlName);
  
        if (control) {
          console.log(`Control '${controlName}':`);
          console.log('  Dirty:', control.dirty);
          console.log('  Pristine:', control.pristine);
          console.log('  Disabled:', control.disabled);
          console.log('  Invalid:', control.invalid);
          console.log('  Touched:', control.touched);
        } else {
          console.error(`Control '${controlName}' not found in the formGroup.`);
        }
      }
    }
  }
  
  onSubmit() {
    if (this.formGroup) {
      console.log('Form submitted successfully!');
      this.disableControl();
      //Update the control name from 'firstname' to 'fname'
      this.formGroup.addControl('fname', this.formGroup.get('firstname'));
      this.formGroup.removeControl('firstname');
      this.formGroup.addControl('age', new FormControl('', [Validators.required]));
     
      // Set the form values here directly
      this.formGroup.patchValue({
        fname: 'loki',
        lastname: 'loki',
        age: 20
      });
      console.log('Form values:', this.formGroup.value);
      this.logFormGroupState();
    } else {
      console.log('Form is invalid. Please fix the errors.');
    }
  }
  
  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks when the component is destroyed
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }
}
