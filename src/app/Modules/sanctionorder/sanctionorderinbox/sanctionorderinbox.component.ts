import { Component, Injector } from '@angular/core';
import { basePlacements } from '@popperjs/core';
import { BaseComponent } from '../../../shared/Ui-Component/BaseComponent';
import { SanctionorderService } from '../../../shared/Services/sanctionorder.service';
import { sanctionorderdetailinbox } from '../../../shared/Models/sanctiondetailsinbox';
import * as XLSX from 'xlsx';
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
  tableColumns = [
    { header: 'View Slip', field: 'id' , type: 'button', buttonText: 'View Slip'  },
    { header: 'Financial Year', field: 'financialYear' },
    { header: 'Scheme Name', field: 'schemename' },
    { header: 'Component Name', field: 'componentName' },
    { header: 'Amount', field: 'amount' },
    { header: 'Sanction Number', field: 'sanctionnumber' },
    { header: 'Approval Status', field: 'approvalStatus' },
  ];
  totalColumns = ['amount'];
  pagedData = []; 
  onViewSlip(id: any) {
    console.log('View Slip clicked for ID:', id);
    // Use Angular's Router to navigate to the new page
    this.router.navigate(['/sanction-order/sanction-order-slip', id]);
  }


  exportToExcel(): void {
    // Convert the data array to a worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.sanctionorderinbox);

    // Create a new workbook and append the worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Export the workbook to a file
    XLSX.writeFile(wb, 'exported-data.xlsx');
  }

}
