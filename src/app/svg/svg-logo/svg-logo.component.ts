import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SvgService } from '../svg.service';

@Component({
    selector: 'svg-logo',
    template: '<div class="svg-logo-container" [innerHtml]="value"></div>',
    styleUrls: ['./svg-logo.component.scss']
})
export class SvgLogoComponent implements OnInit {
    private _svgId: string | undefined;

    value: SafeHtml | undefined;

    @Input() set svgId(value: string | undefined) {
        this._svgId = value;
        this.refresh();
    }

    constructor(private domSanitizer: DomSanitizer, private svgService: SvgService) {}

    ngOnInit(): void {
        this.refresh();
    }

    private refresh(): void {
        if (this._svgId) {
            this.svgService.getSvg(this._svgId + '.svg')
                .subscribe(data => this.value = this.domSanitizer.bypassSecurityTrustHtml(data));
        }
    }
}