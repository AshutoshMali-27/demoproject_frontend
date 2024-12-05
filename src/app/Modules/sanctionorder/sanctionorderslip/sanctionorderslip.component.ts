import { routes } from './../../../app.routes';
import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../shared/Ui-Component/BaseComponent';
@Component({
  selector: 'app-sanctionorderslip',
  // standalone: true,
  // imports: [],
  templateUrl: './sanctionorderslip.component.html',
  styleUrl: './sanctionorderslip.component.css'
})
export class SanctionorderslipComponent extends BaseComponent implements OnInit {
  slipId: string | null = null;

  constructor(injector: Injector,private route:ActivatedRoute) {
    super(injector);
    
  }

  ngOnInit(): void {
    this.slipId = this.route.snapshot.paramMap.get('id');
    console.log('View Slip ID:', this.slipId);
  }

  
}
