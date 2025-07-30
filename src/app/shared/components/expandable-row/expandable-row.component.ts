import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import {
  ExpandedRowData,
  TabConfig,
  ColumnConfig,
} from '../../models/client.model';
import { TAB_CONFIGS } from '../../constants/table-config';

@Component({
  selector: 'app-expandable-row',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './expandable-row.component.html',
  styleUrls: ['./expandable-row.component.scss'],
})
export class ExpandableRowComponent {
  @Input() expandedData!: ExpandedRowData;

  tabConfigs: TabConfig[] = TAB_CONFIGS;

  getTabData(tabKey: keyof ExpandedRowData): any[] {
    return this.expandedData[tabKey] || [];
  }

  getDisplayedColumnsForTab(tabConfig: TabConfig): string[] {
    return tabConfig.columns.map((col) => col.key);
  }

  getColumnValue(element: any, column: ColumnConfig): any {
    const value = element[column.key];

    switch (column.type) {
      case 'date':
        return this.formatDate(value);
      case 'datetime':
        return this.formatDateTime(value);
      case 'file':
        return value;
      default:
        return value;
    }
  }

  private formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL');
  }

  private formatDateTime(dateTimeString: string): string {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    return (
      date.toLocaleDateString('pl-PL') +
      ' ' +
      date.toLocaleTimeString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  }

  isFileColumn(column: ColumnConfig): boolean {
    return column.type === 'file';
  }

  downloadFile(fileName: string): void {
    console.log('Pobieranie pliku:', fileName);
  }
}
