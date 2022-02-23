import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EnlevementsPage} from './pages/enlevements/enlevements-page.component';
import {EnlevementsRoutingModule} from './enlevements-routing.module';
import {
  ExcelExportService,
  FilterService,
  GridAllModule,
  PageService,
  SearchService,
  SortService
} from '@syncfusion/ej2-angular-grids';
import {ButtonAllModule} from "@syncfusion/ej2-angular-buttons";
import {ReactiveFormsModule} from "@angular/forms";
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import {MenuAllModule} from "@syncfusion/ej2-angular-navigations";

@NgModule({
  declarations: [
    EnlevementsPage
  ],
  imports: [
    CommonModule,
    EnlevementsRoutingModule,
    GridAllModule,
    ButtonAllModule,
    ReactiveFormsModule,
    DateRangePickerModule,
    MenuAllModule
  ],
  providers: [ExcelExportService, PageService, FilterService, SearchService, SortService]
})
export class EnlevementsModule { }
