import { Component } from '@angular/core';
import { ApplogoComponent } from '../applogo/applogo.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports:[ApplogoComponent],
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
