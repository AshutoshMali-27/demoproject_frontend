import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-popovers',
  templateUrl: './popovers.component.html',
  styleUrl: './popovers.component.css'
})
export class PopoversComponent {

  @Input() id: string;
}
