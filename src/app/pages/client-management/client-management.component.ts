import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MaterialModule } from '../../shared/material.module';
import { DataService } from '../../core/services/data.service';
import {
  Client,
  ExpandedRowData,
  ColumnConfig,
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
  clients: Client[] = [];
  displayedColumns: string[] = [];
  columnsConfig: ColumnConfig[] = CLIENT_COLUMNS;
  expandedElement: Client | null = null;
  expandedData: ExpandedRowData | null = null;
  isLoadingExpanded = false;

  constructor(private dataService: DataService) {
    // Przygotowanie kolumn z akcjami
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
    this.dataService.getClients().subscribe({
      next: (clients) => {
        this.clients = clients;
      },
      error: (error) => {
        console.error('Błąd podczas ładowania klientów:', error);
      },
    });
  }

  toggleRow(element: Client): void {
    if (this.expandedElement === element) {
      // Zamykanie rozszerzonego wiersza
      this.expandedElement = null;
      this.expandedData = null;
    } else {
      // Otwieranie nowego wiersza
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
}
