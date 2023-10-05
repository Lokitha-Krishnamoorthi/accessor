import { Component } from '@angular/core';
import { ControlsDirective } from '../controls.directive';
import { OnInit,Input, forwardRef, Output, EventEmitter} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent<T> extends ControlsDirective <T> {
  @Input() options: T[] = [];
  @Input() selectId = '';
  @Input() label = '';
  @Input() customErrorMessages: Record<string, string> = {};
}
