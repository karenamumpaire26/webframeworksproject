import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class AboutComponent {
  title = 'About StudentInc';
  description = 'StudentInc helps MTU students explore campus buildings, find services, and navigate academic life.';
}
