import { Component } from '@angular/core';
import { ControlsDirective } from '../controls.directive';
import { OnInit,Input, forwardRef, Output, EventEmitter} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent<T> extends ControlsDirective <T>  {
  @Input() checkboxId = '';
  @Input() label = '';
  @Input() customErrorMessages: Record<string, string> = {};
}
