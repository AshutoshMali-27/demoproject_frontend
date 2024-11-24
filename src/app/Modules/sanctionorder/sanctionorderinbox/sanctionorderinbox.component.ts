import { Component, Injector } from '@angular/core';
import { basePlacements } from '@popperjs/core';
import { BaseComponent } from '../../../shared/Ui-Component/BaseComponent';
import { SanctionorderService } from '../../../shared/Services/sanctionorder.service';
import { sanctionorderdetailinbox } from '../../../shared/Models/sanctiondetailsinbox';

@Component({
  selector: 'app-sanctionorderinbox',
  // standalone: true,
  // imports: [],
  templateUrl: './sanctionorderinbox.component.html',
  styleUrl: './sanctionorderinbox.component.css'
})
export class SanctionorderinboxComponent extends BaseComponent {


  constructor(injector: Injector, private service: SanctionorderService) {
    super(injector);
    
  }

  sanctionorderinbox: sanctionorderdetailinbox[] = [];


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadSanctionorderinbox();
  }
  loadSanctionorderinbox() {
    this.service.getSanctionDetailsinbox().subscribe({
      next: (data) => {
        console.log(data);
        this.sanctionorderinbox = data;
        console.log(this.sanctionorderinbox);
      },
      error: (err) => {
        console.error('Error fetching dropdown items', err);
      },
    });
  }

}
