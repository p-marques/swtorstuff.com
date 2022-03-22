import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {

    constructor(private titleService: Title) { }

    public ngOnInit() {
        this.titleService.setTitle("Builder <> SWTOR STUFF");
      }
}