import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isSmallScreen = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.Large,
      Breakpoints.Medium,
      Breakpoints.Small
    ]).subscribe(_ => {
      this.handleLayoutChange();
    });
  }

  private handleLayoutChange() {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 600px)');
  }
}
