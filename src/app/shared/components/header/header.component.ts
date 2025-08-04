import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  HeaderService,
  BreadcrumbItem,
} from '../../../core/services/header.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <header class="app-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <nav class="breadcrumb-container">
              <span
                class="breadcrumb-item"
                *ngFor="let item of breadcrumbItems; let last = last"
                [class.active]="item.active"
              >
                {{ getDisplayText(item) }}
                <span *ngIf="!last" class="separator"> - </span>
              </span>
            </nav>
          </div>
        </div>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  breadcrumbItems: BreadcrumbItem[] = [];

  constructor(
    private headerService: HeaderService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.headerService.breadcrumb$
      .pipe(takeUntil(this.destroy$))
      .subscribe((items: BreadcrumbItem[]) => {
        this.breadcrumbItems = items;
      });

    this.translate.onLangChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.breadcrumbItems = [...this.breadcrumbItems];
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getDisplayText(item: BreadcrumbItem): string {
    if (item.translationKey && item.translationKey.trim().length > 0) {
      return this.translate.instant(item.translationKey);
    }
    return item.label || '';
  }
}
