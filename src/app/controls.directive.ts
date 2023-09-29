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
  @Output() valueChange = new EventEmitter<FormControl>(); 

  constructor(@Inject(Injector) private injector: Injector) {}
 
  
  ngOnInit() {
    this.setFormControl();
    this.isRequired = this.control?.hasValidator(Validators.required) ?? false;
  }

  setFormControl() {
    try {
      const formControl = this.injector.get(NgControl);

    console.log("form",formControl.name);
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
    .subscribe(() => {
      this.control?.markAsUntouched()         // Mark the control as untouched when the value changes
      this.valueChange.emit(this.control);  
    }); 
}

  registerOnTouched(fn: () => T): void {
    this._onTouched = fn;
  }



  isControlDirty(): boolean {
    return this.control ? this.control.dirty : false;
  }

  isControlValid(): boolean{
    return this.control ? this.control.invalid : false;
  }

  @HostBinding('class.ng-touched') get isTouched() {
    return this.control?.touched;
  }

  // output changes during onchange event called
  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      const value = target.value;
      console.log("value from custom",value);
    }
  }
}