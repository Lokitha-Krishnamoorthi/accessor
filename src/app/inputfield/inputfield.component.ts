import { Component ,OnInit,Input} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-inputfield',
  templateUrl: './inputfield.component.html',
  styleUrls: ['./inputfield.component.scss'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR, // accessor token now angular will know this is a form component
      useExisting: InputfieldComponent,
      multi:true // we have multi field
    }
  ]
})
export class InputfieldComponent implements OnInit, ControlValueAccessor{

  @Input() label: string="";
  value!:string;
  onChange!: (value: string) => void;
  onTouched!: () => void;
  constructor() {}

  //write value from the form control instance to native html control
  writeValue(obj: any): void { 
    this.value=obj;
  }

  //propagate value native to form control
  registerOnChange(fn: any): void { 
    this.onChange=fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched =fn;
  }
  

  ngOnInit(): void {
    
  }
}
