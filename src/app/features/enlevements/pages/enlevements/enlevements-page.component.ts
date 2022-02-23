import {Component, OnInit, ViewChild} from '@angular/core';
import {ColumnModel, GridComponent} from '@syncfusion/ej2-angular-grids';
import {DataManager, ODataV4Adaptor, Query} from '@syncfusion/ej2-data';
import {Store} from '../../../../core/store';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ClickEventArgs, MenuEventArgs} from '@syncfusion/ej2-angular-navigations';

@Component({
  template: `
    <div class="d-flex flex-column h-100">
      <h1 class="text-center"><i class="fas fa-truck mr-1"></i>Enlèvements</h1>
      <section class="search-container bg-white rounded-top">
        <div class="bg-dark text-light p-1 rounded-top font-weight-bold">
          <h3 class="m-0"><i class="ml-1 fas fa-filter fa-sm"></i> Filtres</h3>
        </div>
        <div class="filter-content">
          <form class="d-flex justify-content-around" [formGroup]="searchForm" (submit)="submit(searchForm.value)">
            <div class="w-75 m-3">
              <h4><i class="far fa-calendar-alt"></i> Période</h4>
              <ejs-daterangepicker [weekNumber]="true" formControlName="periode"
                                   width="300px"
                                   placeholder="Sélectionner une période" format="dd/MM/yyyy">
                <!--<e-presets>
                  <e-preset i18n-label="daterangepicker.presets.lastThreeDays"
                            label="Les 3 derniers jours"
                            [start]="presets.lastThreeDays.start"
                            [end]="presets.lastThreeDays.end"></e-preset>
                  <e-preset i18n-label="daterangepicker.presets.lastSevenDays"
                            label="Les 7 derniers jours"
                            [start]="presets.lastSevenDays.start"
                            [end]="presets.lastSevenDays.end"></e-preset>
                </e-presets>-->
              </ejs-daterangepicker>
            </div>
            <div class="w-25 m-3 d-flex justify-content-center align-items-center">
              <button type="submit" ejs-button cssClass="e-info"><i
                class="fas fa-search"></i> Rechercher
              </button>
            </div>
          </form>
        </div>
      </section>
      <div class="h-100">
        <!--<ejs-menu cssClass="bg-dark"
                  [items]='[{ text: "Données", iconCss:"fas fa-database" },{ text: "Graphique", iconCss:"fas fa-chart-line" }]'>
          <ng-template #template let-data>
            <div class="d-flex align-items-center text-light p-1 font-weight-bold">
              <h5 class="m-0"><i class="ml-1 fa-sm" [ngClass]="data.iconCss"></i> {{data.text}}</h5>
            </div>
          </ng-template>
        </ejs-menu>-->
        <div class="bg-dark text-light p-1 font-weight-bold">
          <h3 class="m-0"><i class="ml-1 fas fa-database fa-sm"></i> Données</h3>
        </div>
        <ejs-grid #grid [dataSource]="data" [columns]="columns"
                  [filterSettings]="{ type: 'Excel' }"
                  [toolbar]="['Search', 'ExcelExport']" [pageSettings]="{pageSize: 50}"
                  [allowExcelExport]="true"
                  [allowFiltering]="true" [allowSorting]="true" [allowPaging]="true"
                  (toolbarClick)='toolbarClick($event)'></ejs-grid>
      </div>
    </div>
  `,
  styleUrls: ['enlevements-page.components.css']
})
// tslint:disable-next-line:component-class-suffix
export class EnlevementsPage implements OnInit {
  @ViewChild('grid') grid: GridComponent;
  public data: DataManager;
  public columns: ColumnModel[];

  public searchForm: FormGroup;

  constructor(private store: Store, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.data = new DataManager({
      url: `/odata/Enlevement`,
      adaptor: new ODataV4Adaptor(),
      crossDomain: true,
      headers: [
        {'Authorization': `Bearer ${this.store.selectSnapshot('accessToken')}`}
      ]
    });

    this.searchForm = this.formBuilder.group({
      periode: '',
    });

    this.columns = [
      {
        field: 'ID',
        headerText: 'ID',
        width: 30,
        isPrimaryKey: true,
        visible: false,
        allowFiltering: false,
        allowSearching: false
      },
      {field: 'Destination', headerText: 'Destination'},
      {field: 'MatriculeCiterne', headerText: 'Matricule Citerne'},
      {field: 'NomLieu', headerText: 'Lieu'},
      {field: 'NomMarketer', headerText: 'Nom Marketer'},
      {field: 'NomProduit', headerText: 'Nom Produit'},
      {field: 'NumBordereau', headerText: 'Num Bordereau', textAlign: 'Right'},
      {field: 'Quantite', headerText: 'Quantite', textAlign: 'Right'},
      {field: 'Date', headerText: 'Date', type: 'Date', format: 'dd/MM/yyyy'}
    ];
  }

  public submit(values: { periode: Array<Date> } | null): void {
    this.applyPeriodFilter(values.periode);

    this.grid.refresh();
  }

  private applyPeriodFilter(periode: Array<Date> | null): void {
    const FILTER_KEY = '$filter';

    const existingFilter = this.grid.query.params.find(p => p.key === FILTER_KEY);
    // Supprime le filtre s'il existe déjà
    if (existingFilter) {
      const index = this.grid.query.params.indexOf(existingFilter);
      if (index !== -1) {
        this.grid.query.params.splice(index, 1);
      }
    }

    // Applique le filtre si on a bien 2 dates (deb et fin)
    if (periode?.length === 2) {
      this.grid.query?.addParams(FILTER_KEY, encodeURI(`Date gt ${periode[0].toISOString()} and Date lt ${periode[1].toISOString()}`));
    }
  }

  toolbarClick(args: ClickEventArgs): void {
    if (args.item.id.includes('excelexport')) {
      this.grid.excelExport();
    }
  }
}
