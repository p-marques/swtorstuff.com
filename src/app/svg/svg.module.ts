import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgLogoComponent } from './svg-logo/svg-logo.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SvgLogoComponent
    ],
    exports: [
        SvgLogoComponent
    ]
})
export class SvgModule { }