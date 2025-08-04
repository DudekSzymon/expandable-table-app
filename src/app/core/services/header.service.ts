import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface BreadcrumbItem {
  label: string;
  translationKey?: string;
  active?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private breadcrumbSubject = new BehaviorSubject<BreadcrumbItem[]>([
    {
      label: 'Klienci',
      translationKey: 'CLIENT_MANAGEMENT.TITLE',
      active: true,
    },
  ]);

  public breadcrumb$: Observable<BreadcrumbItem[]> =
    this.breadcrumbSubject.asObservable();

  setBreadcrumb(items: BreadcrumbItem[]): void {
    this.breadcrumbSubject.next(items);
  }

  updateBreadcrumb(
    mainTitle: string,
    mainKey: string,
    subTitle?: string,
    subKey?: string
  ): void {
    const items: BreadcrumbItem[] = [
      { label: mainTitle, translationKey: mainKey, active: !subTitle },
    ];

    if (subTitle) {
      items.push({
        label: subTitle,
        translationKey: subKey || subTitle,
        active: true,
      });
    }

    this.setBreadcrumb(items);
  }

  updateBreadcrumbWithClient(
    mainTitle: string,
    mainKey: string,
    clientName: string
  ): void {
    const items: BreadcrumbItem[] = [
      { label: mainTitle, translationKey: mainKey, active: false },
      { label: clientName, active: true },
    ];

    this.setBreadcrumb(items);
  }

  updateBreadcrumbWithClientAndTab(
    mainTitle: string,
    mainKey: string,
    clientName: string,
    tabName: string
  ): void {
    const items: BreadcrumbItem[] = [
      { label: mainTitle, translationKey: mainKey, active: false },
      { label: clientName, active: false },
      { label: tabName, active: true },
    ];

    this.setBreadcrumb(items);
  }

  resetToMain(): void {
    this.setBreadcrumb([
      {
        label: 'Klienci',
        translationKey: 'CLIENT_MANAGEMENT.TITLE',
        active: true,
      },
    ]);
  }

  getCurrentBreadcrumb(): BreadcrumbItem[] {
    return this.breadcrumbSubject.value;
  }
}
