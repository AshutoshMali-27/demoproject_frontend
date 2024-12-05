import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-ng-datagrid',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FormsModule],
  templateUrl: './ng-datagrid.component.html',
  styleUrls: ['./ng-datagrid.component.css'],
})
export class NgDatagridComponent {
  @Input() columns: Array<{ header: string; field: string; type?: string; buttonText?: string }> = [];
  @Input() data: any[] = [];
  @Input() totalColumns: string[] = []; // Specify columns for totals
  @Output() buttonClick = new EventEmitter<any>();

  rowsPerPage: number = 5; // Default rows per page
  rowsPerPageOptions: number[] = [5, 10, 100]; // Dropdown options for rows per page
  currentPage: number = 1;
  paginatedData: any[] = [];
  filteredData: any[] = [];
  searchQuery: string = '';

  ngOnInit(): void {
    this.filteredData = [...this.data];
    this.updatePagination();
  }

  ngOnChanges(): void {
    this.filteredData = [...this.data];
    this.updatePagination();
  }

   updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    const endIndex = startIndex + this.rowsPerPage;
    this.paginatedData = this.filteredData.slice(startIndex, endIndex);
  }

  applySearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredData = this.data.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(query)
      )
    );
    this.currentPage = 1; // Reset to first page on search
    this.updatePagination();
  }

  changePage(newPage: number): void {
    this.currentPage = newPage;
    this.updatePagination();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.rowsPerPage);
  }

  getPageTotal(field: string): number {
    return this.paginatedData.reduce((sum, row) => sum + (parseFloat(row[field]) || 0), 0);
  }

  getGrandTotal(field: string): number {
    return this.data.reduce((sum, row) => sum + (parseFloat(row[field]) || 0), 0);
  }
}
