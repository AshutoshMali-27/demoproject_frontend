import { Component, Injector } from '@angular/core';
import { BaseComponent } from '../../Ui-Component/BaseComponent';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent extends BaseComponent {

  constructor(injector: Injector) {
    super(injector);

}



collapsedStates: { [key: string]: boolean } = {};

  // Toggle collapse/expand state for each menu identified by key
  toggleMenu(menuKey: string): void {
    this.collapsedStates[menuKey] = !this.collapsedStates[menuKey];
  }

  sanctionentry(){
  
    this.router.navigate(['/sanction-order/sanction-order-entry']);
  }
  sanctionorderinbox(){
    this.router.navigate(['/sanction-order/sanction-order-inbox']);
  }
  sanctionorderoutbox(){
    this.router.navigate(['/sanction-order/sanction-order-outbox']);
  }

  // Method to check if a menu is collapsed or expanded
  isCollapsed(menuKey: string): boolean {
    return this.collapsedStates[menuKey] || false; // Default to false (collapsed)
  }
}
