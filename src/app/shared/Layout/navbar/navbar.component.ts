import { Component, Injector } from '@angular/core';
import { BaseComponent } from '../../Ui-Component/BaseComponent';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  extends BaseComponent{

  constructor(injector: Injector) {
    super(injector);

}

}
