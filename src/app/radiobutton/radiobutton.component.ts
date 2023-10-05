import { Component } from '@angular/core';
import { ControlsDirective } from '../controls.directive';
import { OnInit,Input, forwardRef, Output, EventEmitter} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadiobuttonComponent),
      multi: true,
    },
  ],

})
export class RadiobuttonComponent<T> extends ControlsDirective <T> {
  @Input() radioId = '';
  @Input() label = '';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() value: T | undefined;
}
