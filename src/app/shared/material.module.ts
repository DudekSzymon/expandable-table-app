import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

const MaterialComponents = [
  MatTableModule,
  MatButtonModule,
  MatIconModule,
  MatTabsModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
];

@NgModule({
  imports: MaterialComponents,
  exports: MaterialComponents,
})
export class MaterialModule {}
