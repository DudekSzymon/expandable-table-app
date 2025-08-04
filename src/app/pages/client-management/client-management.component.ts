import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialModule } from '../../shared/material.module';
import { DataService } from '../../core/services/data.service';
import { HeaderService } from '../../core/services/header.service';
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
  imports: [
    CommonModule,
    MaterialModule,
    ExpandableRowComponent,
    TranslateModule,
  ],
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
export class ClientManagementComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private destroy$ = new Subject<void>();

  clients: Client[] = [];
  displayedColumns: string[] = [];
  columnsConfig: ColumnConfig[] = CLIENT_COLUMNS;
  expandedElement: Client | null = null;
  expandedData: ExpandedRowData | null = null;
  isLoadingExpanded = false;
  isLoadingClients = false;
  error: string | null = null;
  activeTab: string | null = null;

  totalCount = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  constructor(
    private dataService: DataService,
    private translate: TranslateService,
    private headerService: HeaderService
  ) {
    this.displayedColumns = [
      'expand',
      ...this.columnsConfig.map((col) => col.key),
      'actions',
    ];
  }

  ngOnInit(): void {
    this.loadClients();
    this.headerService.resetToMain();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadClients(): void {
    this.isLoadingClients = true;
    this.error = null;

    this.dataService
      .getClients(this.currentPage, this.pageSize)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          console.error('Błąd podczas ładowania klientów:', error);
          this.error = 'Błąd podczas ładowania klientów';
          return of({
            data: [],
            totalCount: 0,
            page: 0,
            pageSize: this.pageSize,
            totalPages: 0,
          });
        }),
        finalize(() => (this.isLoadingClients = false))
      )
      .subscribe({
        next: (response: PaginatedResponse<Client>) => {
          this.clients = response.data;
          this.totalCount = response.totalCount;
          this.expandedElement = null;
          this.expandedData = null;
          this.activeTab = null;
          this.headerService.resetToMain();
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
      this.activeTab = null;
      this.headerService.resetToMain();
    } else {
      this.expandedElement = element;
      this.loadExpandedData(element);
    }
  }

  private loadExpandedData(client: Client): void {
    this.isLoadingExpanded = true;
    const clientFullName = `${client.imie} ${client.nazwisko}`;
    this.dataService
      .getExpandedRowData(clientFullName)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          console.error('Błąd podczas ładowania danych rozszerzonych:', error);
          return of({ offers: [], invoices: [], contracts: [] });
        }),
        finalize(() => (this.isLoadingExpanded = false))
      )
      .subscribe({
        next: (data) => {
          this.expandedData = data;
          this.headerService.updateBreadcrumbWithClient(
            'Klienci',
            'CLIENT_MANAGEMENT.TITLE',
            clientFullName
          );
        },
      });
  }

  onTabChanged(tabKey: string): void {
    this.activeTab = tabKey;

    if (this.expandedElement) {
      const clientFullName = `${this.expandedElement.imie} ${this.expandedElement.nazwisko}`;
      let tabTranslationKey = '';

      switch (tabKey) {
        case 'offers':
          tabTranslationKey = 'TABS.OFFERS';
          break;
        case 'invoices':
          tabTranslationKey = 'TABS.INVOICES';
          break;
        case 'contracts':
          tabTranslationKey = 'TABS.CONTRACTS';
          break;
      }

      if (tabTranslationKey) {
        this.headerService.updateBreadcrumbWithClientAndTab(
          'Klienci',
          'CLIENT_MANAGEMENT.TITLE',
          clientFullName,
          this.translate.instant(tabTranslationKey)
        );
      }
    }
  }

  isExpanded(element: Client): boolean {
    return this.expandedElement === element;
  }

  getColumnValue(element: any, column: ColumnConfig): any {
    return element[column.key];
  }

  getColumnLabel(column: ColumnConfig): string {
    return this.translate.instant(column.label);
  }

  viewClient(client: Client, event: Event): void {
    event.stopPropagation();
  }

  editClient(client: Client, event: Event): void {
    event.stopPropagation();
  }

  deleteClient(client: Client, event: Event): void {
    event.stopPropagation();
  }
}
