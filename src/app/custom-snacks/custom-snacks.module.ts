import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorSnackComponent } from './error-snack/error-snack.component';
import { MaterialModule } from '../material.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    declarations: [
        ErrorSnackComponent
    ],
    exports: [
        ErrorSnackComponent
    ]
})
export class CustomSnacksModule { }