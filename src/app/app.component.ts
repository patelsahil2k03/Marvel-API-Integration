import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  appName = 'Marvel API Explorer';
  animationEnabled = false;

  toggleAnimation(): void {
    this.animationEnabled = !this.animationEnabled;
  }
}
