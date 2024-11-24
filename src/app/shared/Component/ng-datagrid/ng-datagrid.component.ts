
import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-ng-datagrid',
  // standalone: true,
  // imports: [],
  templateUrl: './ng-datagrid.component.html',
  styleUrl: './ng-datagrid.component.css'
})
// implements OnChanges 
export class NgDatagridComponent  {

  // @Input() title: string = 'Table';
  // @Input() data: any[] = [];
  // @Input() columns: { field: string; header: string }[] = [];
  // @Input() rows: number = 5;
  // @Output() onView: EventEmitter<any> = new EventEmitter();

  // currentPage: number = 1;
  // currentSort: { field: string; direction: string } = { field: '', direction: '' };
  // globalSearch: string = '';
  // paginatedData: any[] = [];
  // totalPages: number = 0;

  // ngOnChanges(): void {
  //   this.updateTable();
  // }

  // applyGlobalSearch(searchValue: string): void {
  //   this.globalSearch = searchValue;
  //   this.currentPage = 1;
  //   this.updateTable();
  // }

  // sortData(field: string): void {
  //   if (this.currentSort.field === field) {
  //     this.currentSort.direction =
  //       this.currentSort.direction === 'asc' ? 'desc' : 'asc';
  //   } else {
  //     this.currentSort = { field, direction: 'asc' };
  //   }
  //   this.updateTable();
  // }

  // changePage(page: number): void {
  //   if (page < 1 || page > this.totalPages) return;
  //   this.currentPage = page;
  //   this.updateTable();
  // }

  // updateTable(): void {
  //   let filteredData = this.data;

  //   // Filter data based on global search
  //   if (this.globalSearch) {
  //     const searchValue = this.globalSearch.toLowerCase();
  //     filteredData = filteredData.filter((item) =>
  //       this.columns.some((col) =>
  //         String(item[col.field]).toLowerCase().includes(searchValue)
  //       )
  //     );
  //   }

  //   // Sort data
  //   if (this.currentSort.field) {
  //     filteredData = [...filteredData].sort((a, b) => {
  //       const valueA = a[this.currentSort.field];
  //       const valueB = b[this.currentSort.field];
  //       if (valueA < valueB) return this.currentSort.direction === 'asc' ? -1 : 1;
  //       if (valueA > valueB) return this.currentSort.direction === 'asc' ? 1 : -1;
  //       return 0;
  //     });
  //   }

  //   // Paginate data
  //   this.totalPages = Math.ceil(filteredData.length / this.rows);
  //   this.paginatedData = filteredData.slice(
  //     (this.currentPage - 1) * this.rows,
  //     this.currentPage * this.rows
  //   );
  // }

  // get pages(): number[] {
  //   return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  // }

  // onViewRecord(record: any): void {
  //   this.onView.emit(record);
  // }
}
