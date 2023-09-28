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
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Subject, takeUntil, startWith, distinctUntilChanged, tap } from 'rxjs';

type InputType = 'text' | 'number' | 'email' | 'password';

@Directive({
  selector: '[appControls]',
})
export class ControlsDirective <T>implements ControlValueAccessor, OnInit
{
  control: FormControl | undefined;
  isRequired = false;

  private _destroy$ = new Subject<void>();
  private _onTouched!: () => T;
  @Input() label = '';
  @Input() type: InputType = 'text';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() appearance: MatFormFieldAppearance = 'fill'; 
  @Input() disabled: boolean = false;
 
  constructor(@Inject(Injector) private injector: Injector) {}
 
  
  ngOnInit() {
    this.setFormControl();
    this.isRequired = this.control?.hasValidator(Validators.required) ?? false;
  }

  setFormControl() {
    try {
      const formControl = this.injector.get(NgControl);

      switch (formControl.constructor) {
        case FormControlName:
          this.control = this.injector
            .get(FormGroupDirective)
            .getControl(formControl as FormControlName);
          break;
        default:
          this.control = (formControl as FormControlDirective)
            .form as FormControl;
          break;
      }
      if (this.control) {
        if (this.disabled) {
          this.control.disable();
        } else {
          this.control.enable();
        }
      }
     
    } catch (err) {
      this.control = new FormControl();
    }
  }

  writeValue(value: T): void {
    this.control
      ? this.control.setValue(value)
      : (this.control = new FormControl(value));
  }

  registerOnChange(fn: (val: T | null) => T): void {
    this.control?.valueChanges
    .pipe(
      takeUntil(this._destroy$),          // Unsubscribe from value changes when the component is destroyed
      startWith(this.control.value),       // Emit the initial value when subscribing
      distinctUntilChanged(),               // Emit distinct values only
      tap((val) => fn(val))                 // Call the provided callback function with the value
    )
    .subscribe(() => this.control?.markAsUntouched());  // Mark the control as untouched when the value changes
}

  registerOnTouched(fn: () => T): void {
    this._onTouched = fn;
  }

  getControlValue(): any {
    console.log("valuesss",this.control?.value);
    return this.control?.value;
  }


  @HostBinding('class.dirty') get isDirty() {
    return this.control?.dirty;
  }

  @HostBinding('class.ng-invalid') get isInvalid() {
    return this.control?.invalid;
  }

  @HostBinding('class.ng-touched') get isTouched() {
    return this.control?.touched;
  }
}