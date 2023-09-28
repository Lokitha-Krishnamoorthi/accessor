import { Component ,OnInit,Input, forwardRef} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlsDirective } from '../controls.directive';
import { MatFormFieldAppearance } from '@angular/material/form-field';

type InputType = 'text' | 'number' | 'email' | 'password';

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
  @Input() label = '';
  @Input() type: InputType = 'text';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() appearance: MatFormFieldAppearance = 'fill'; 
}
