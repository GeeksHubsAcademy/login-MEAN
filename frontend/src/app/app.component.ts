import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  ngOnInit() {
    const token = localStorage.getItem('authToken');
    console.log(token)
  }
}
