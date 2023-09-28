import { Component ,OnInit,Input, forwardRef, Output, EventEmitter} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlsDirective } from '../controls.directive';


@Component({
  selector: 'app-inputfield',
  templateUrl: './inputfield.component.html',
  styleUrls: ['./inputfield.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputfieldComponent),
      multi: true,
    },
  ],
})
export class InputfieldComponent <T> extends ControlsDirective <T> {
 
}
