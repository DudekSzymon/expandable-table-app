import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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
  imports: [CommonModule, MaterialModule, TranslateModule],
  templateUrl: './expandable-row.component.html',
  styleUrls: ['./expandable-row.component.scss'],
})
export class ExpandableRowComponent implements AfterViewInit {
  @Input() expandedData!: ExpandedRowData;
  @Output() tabChanged = new EventEmitter<string>();

  tabConfigs: TabConfig[] = TAB_CONFIGS;

  constructor(private translate: TranslateService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.tabConfigs.length > 0) {
        this.tabChanged.emit(this.tabConfigs[0].key);
      }
    }, 0);
  }

  onTabChanged(index: number): void {
    const tabKey = this.tabConfigs[index]?.key;
    if (tabKey) {
      this.tabChanged.emit(tabKey);
    }
  }

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

  getColumnLabel(column: ColumnConfig): string {
    return this.translate.instant(column.label);
  }

  getTabLabel(tabConfig: TabConfig): string {
    return this.translate.instant(tabConfig.label);
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
