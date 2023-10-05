import { Directive, EventEmitter, HostBinding, Inject, Injector, Input, OnInit, Output } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  Validators,
  NgControl,
  FormControlName,
  FormGroupDirective,
  FormControlDirective,
} from '@angular/forms';

import { Subject, takeUntil, startWith, distinctUntilChanged, tap } from 'rxjs';


@Directive({
  selector: '[appControls]',
})
export class ControlsDirective <T>implements ControlValueAccessor, OnInit
{
  control: FormControl | undefined;
  isRequired = false;
  private _destroy$ = new Subject<void>();
  private _onTouched!: () => T;
  
  constructor(@Inject(Injector) private injector: Injector) {}
 
  ngOnInit() {
    this.setFormControl();
    this.isRequired = this.control?.hasValidator(Validators.required) ?? false;
  }

  setFormControl() {
    try {
      const formControl = this.injector.get(NgControl);
      console.log("formcontrol",formControl);
      if (formControl) {
        switch (formControl.constructor) {
          case FormControlName:
            this.control = this.injector.get(FormGroupDirective)
              .getControl(formControl as FormControlName);
            break;
          default:
            this.control = (formControl as FormControlDirective)
              .form as FormControl;
            break;
        }
      } else {
        // If NgControl is not provided, create a new FormControl
        this.control = new FormControl();
      }
    } catch (err) {
      this.control = new FormControl(); 
    }
  }

  // writeValue(value: T): void {
  //   if (this.control) {
  //     this.control.setValue(value);
  //   } else {
  //     console.error('FormControl not initialized, cannot set value.');
  //     this.control = new FormControl(value);
  //   }
  // }
  writeValue(value: T): void {
    if (this.control && this.control.value !== value) {  // Check if the value is different
      this.control.setValue(value);  // Set the value only if it's different
    }
  }
  
  registerOnChange(fn: (val: T | null) => T): void {
    this.control?.valueChanges
    .pipe(
      takeUntil(this._destroy$),          // Unsubscribe from value changes when the component is destroyed
      startWith(this.control.value),       // Emit the initial value when subscribing
      distinctUntilChanged(),               // Emit distinct values only
      tap((val) => fn(val))                 // Call the provided callback function with the value
    )
    .subscribe(() => { 
      this.control?.markAsUntouched()         // Mark the control as untouched when the value changes 
    }); 
}

  registerOnTouched(fn: () => T): void {
    this._onTouched = fn;
  }

}