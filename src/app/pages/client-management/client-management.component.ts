import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MaterialModule } from '../../shared/material.module';
import { DataService } from '../../core/services/data.service';
import {
  Client,
  ExpandedRowData,
  ColumnConfig,
  PaginatedResponse,
} from '../../shared/models/client.model';
import { CLIENT_COLUMNS } from '../../shared/constants/table-config';
import { ExpandableRowComponent } from '../../shared/components/expandable-row/expandable-row.component';

@Component({
  selector: 'app-client-management',
  standalone: true,
  imports: [CommonModule, MaterialModule, ExpandableRowComponent],
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ClientManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  clients: Client[] = [];
  displayedColumns: string[] = [];
  columnsConfig: ColumnConfig[] = CLIENT_COLUMNS;
  expandedElement: Client | null = null;
  expandedData: ExpandedRowData | null = null;
  isLoadingExpanded = false;
  isLoadingClients = false;

  totalCount = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  constructor(private dataService: DataService) {
    this.displayedColumns = [
      'expand',
      ...this.columnsConfig.map((col) => col.key),
      'actions',
    ];
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.isLoadingClients = true;
    this.dataService.getClients(this.currentPage, this.pageSize).subscribe({
      next: (response: PaginatedResponse<Client>) => {
        this.clients = response.data;
        this.totalCount = response.totalCount;
        this.isLoadingClients = false;

        this.expandedElement = null;
        this.expandedData = null;
      },
      error: (error) => {
        console.error('Błąd podczas ładowania klientów:', error);
        this.isLoadingClients = false;
      },
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadClients();
  }

  toggleRow(element: Client): void {
    if (this.expandedElement === element) {
      this.expandedElement = null;
      this.expandedData = null;
    } else {
      this.expandedElement = element;
      this.loadExpandedData(element);
    }
  }

  private loadExpandedData(client: Client): void {
    this.isLoadingExpanded = true;
    const clientFullName = `${client.imie} ${client.nazwisko}`;

    this.dataService.getExpandedRowData(clientFullName).subscribe({
      next: (data) => {
        this.expandedData = data;
        this.isLoadingExpanded = false;
      },
      error: (error) => {
        console.error('Błąd podczas ładowania danych rozszerzonych:', error);
        this.isLoadingExpanded = false;
      },
    });
  }

  isExpanded(element: Client): boolean {
    return this.expandedElement === element;
  }

  getColumnValue(element: any, column: ColumnConfig): any {
    return element[column.key];
  }

  viewClient(client: Client, event: Event): void {
    event.stopPropagation();
    console.log('Podgląd klienta:', client);
  }

  editClient(client: Client, event: Event): void {
    event.stopPropagation();
    console.log('Edytowanie klienta:', client);
  }

  deleteClient(client: Client, event: Event): void {
    event.stopPropagation();
    console.log('Usuwanie klienta:', client);
  }
}
