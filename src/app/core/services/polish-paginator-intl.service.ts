import { Injectable, OnDestroy } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class PolishPaginatorIntl extends MatPaginatorIntl implements OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private translate: TranslateService) {
    super();
    this.initializeTranslations();

    this.translate.onLangChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.initializeTranslations();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeTranslations(): void {
    this.translate
      .get([
        'PAGINATION.ITEMS_PER_PAGE',
        'PAGINATION.NEXT_PAGE',
        'PAGINATION.PREVIOUS_PAGE',
        'PAGINATION.FIRST_PAGE',
        'PAGINATION.LAST_PAGE',
      ])
      .pipe(takeUntil(this.destroy$))
      .subscribe((translations) => {
        this.itemsPerPageLabel = translations['PAGINATION.ITEMS_PER_PAGE'];
        this.nextPageLabel = translations['PAGINATION.NEXT_PAGE'];
        this.previousPageLabel = translations['PAGINATION.PREVIOUS_PAGE'];
        this.firstPageLabel = translations['PAGINATION.FIRST_PAGE'];
        this.lastPageLabel = translations['PAGINATION.LAST_PAGE'];
        this.changes.next();
      });
  }

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 z ${length}`;
    }

    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;

    return `${startIndex + 1} – ${endIndex} z ${length}`;
  };
}
