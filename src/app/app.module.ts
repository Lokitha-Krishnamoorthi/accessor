import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputfieldComponent } from './inputfield/inputfield.component';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ControlsDirective } from './controls.directive';
import { InputValidationsComponent } from './input-validations/input-validations.component';
import { SelectComponent } from './select/select.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { MultiselectComponent } from './multiselect/multiselect.component';
import { RadiobuttonComponent } from './radiobutton/radiobutton.component';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
@NgModule({
  declarations: [
    AppComponent,
    InputfieldComponent,
    ControlsDirective,
    InputValidationsComponent,
    SelectComponent,
    CheckboxComponent,
    MultiselectComponent,
    RadiobuttonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
