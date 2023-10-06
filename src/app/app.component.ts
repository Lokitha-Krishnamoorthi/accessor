import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from './theme.service';
import { CookieService } from 'ngx-cookie-service';
// import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{

  title = 'control value accessor';

  // Custom error Messages
  errorMessages = { required: 'The First Name field is required' };
  errorMessagesl = { required: 'The Last Name field is required' };
  emyear = {required: 'Select any year'};
  emage = {required: 'select age'};
  emclick = {required: 'click the checkbox'};

  //Input Field Apperance
  appearance: MatFormFieldAppearance = 'fill';
  appearance1: MatFormFieldAppearance = 'outline';


  formGroup: FormGroup;
  checkboxgrp: FormGroup;
 

  private formSubscription: Subscription;
  private checkboxSubscription: Subscription;
  // private themeService!: ThemeService;
  // private cookieService!: CookieService;

  constructor(private fb: FormBuilder, private cookieService: CookieService) {
    
    this.formGroup = this.fb.group({
          firstname: ['', [Validators.required]],
          lastname: ['', [Validators.required]],
          age: [, [Validators.required]],
          click:[,[Validators.required]],
          years:[],
          radioControl: [null, [Validators.required]]
        });

    this.checkboxgrp = this.fb.group({
          PG:[false,[Validators.required]],
          UG:[false,[Validators.required]],
        });
    
    // Subscribe to form control value changes
    this.formSubscription = this.formGroup.valueChanges.subscribe(value => {

          //setvalue for lastname 
          const modifiedValue = value.lastname.toUpperCase();
          const firstnameControl = this.formGroup.get('lastname');
          if (firstnameControl) {
            firstnameControl.setValue(modifiedValue, { emitEvent: false });
          } else {
            console.error("Control 'lastname' not found in the formGroup.");
          }
          console.log('Form control values changed:', this.formGroup.value);
        });

    // Subscribe to form control value changes for checkboxgrp
    this.checkboxSubscription = this.checkboxgrp.valueChanges.subscribe(value => {
      console.log('Checkbox group values changed:', this.checkboxgrp.value);
    });
  }
  

  
  disableControl(controlName: string) {
    const control = this.formGroup.get(controlName);
    if (control) {
      control.disable();
    } else {
      console.error("Control 'firstname' not found in the formGroup.");
    }
  }

  enableControl(controlName: string) {
    const control = this.formGroup.get(controlName);
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
  themeService: ThemeService = new ThemeService;


ngOnInit() {
  // Retrieve the theme value from cookies
  const storedTheme = this.cookieService.get('theme');
  
  // Set the retrieved theme value in the service (or provide a default theme if none is found)
  const defaultTheme = 'light'; // You can define your default theme here
  const themeToApply = storedTheme || defaultTheme;
  this.themeService.setActiveTheme(themeToApply);
}

  toggleTheme() {
    const currentTheme = this.themeService.getActiveTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Set the new theme value in a cookie
    this.cookieService.set('theme', newTheme);
    
    // Update the theme in the service
    this.themeService.setActiveTheme(newTheme);
  }

  private logFormGroupState() {
    console.log('FormGroup State:');
    console.log('Dirty:', this.formGroup.dirty);
    console.log('Pristine:', this.formGroup.pristine);
    console.log('Disabled:', this.formGroup.disabled);
    console.log('Invalid:', this.formGroup.invalid);
    console.log('Touched:', this.formGroup.touched);

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
      this.disableControl("firstname");
      this.markControlAsPristine("lastname");
      //this.logFormGroupState();

      //Update the control name from 'firstname' to 'fname'
      this.formGroup.addControl('fname', this.formGroup.get('firstname'));

      //removing formcontrol 
      this.formGroup.removeControl('firstname');

      //add new formcontrol
      this.formGroup.addControl('year', new FormControl('', [Validators.required]));
     
      // Set the form values here directly
      this.formGroup.patchValue({
        fname: 'loki',
        lastname: 'loki',
        year: 20,
        years:['2021'],
        click: false,
        radioControl: "Hosteller",
      });
      
      this.disableControl("radioControl");
      console.log('FormGroup values:', this.formGroup.value);
      this.logFormGroupState();
      console.log('Checkbox',this.checkboxgrp.value);
    } 
    else {
      console.log('Form is invalid. Please fix the errors.');
    }
  }
  
  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks when the component is destroyed
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
    if(this.checkboxSubscription){
      this.checkboxSubscription.unsubscribe();
    }
  }
}
