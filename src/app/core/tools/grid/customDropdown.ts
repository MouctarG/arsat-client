import { DropDownList } from '@syncfusion/ej2-angular-dropdowns';
import { Column } from '@syncfusion/ej2-angular-grids';
import { DataManager } from '@syncfusion/ej2-data';
import { EditManagerTools } from './EditManagerTools';

export class CustomDropdown {
    public dataManager?: string[] | DataManager | { [key: string]: Object; }[] | number[] | boolean[];

    public editDropDownElem: HTMLInputElement;
    public editDropDownObj: DropDownList;

    public setDataManager(dataManager?: string[] | DataManager | { [key: string]: Object; }[] | number[] | boolean[]): void {
      this.dataManager = dataManager;
    }

    public create = () => {
      this.editDropDownElem = document.createElement('input');
      return this.editDropDownElem;
    };

    public read = () => {
      return this.editDropDownObj.value;
    };

    public destroy = () => {
      this.editDropDownObj.destroy();
    };

    public write = (args: { column: Column; rowData: { [x: string]: any; }; }) => {
      this.editDropDownObj = new DropDownList({
        enabled: EditManagerTools.getCustomAttribute(args.column, 'allowEditing', true) as boolean,
        dataSource: this.dataManager,
        itemTemplate: EditManagerTools.getCustomAttribute(args.column, 'itemTemplate', undefined) as string,
        valueTemplate: EditManagerTools.getCustomAttribute(args.column, 'itemTemplate', undefined) as string,
        placeholder: EditManagerTools.getCustomAttribute(args.column, 'placeholder', 'Choisissez') as string,
        fields: { value: EditManagerTools.getCustomAttribute(args.column, 'childId', 'id') as string }, // valeur que l'on va récupérer (typiquement, l'id de l'entité enfant)
      });

      const nomChamp = EditManagerTools.getCustomAttribute(args.column, 'value', 'id') as string;
      let valeur = args.rowData[nomChamp];

      if (nomChamp.includes('.')) {
        nomChamp.split('.').forEach(element => {
            valeur = valeur === undefined ? args.rowData[element] : valeur[element];
        });
      }

      // Force le placeholder à être affiché au dessus de l'input
      this.editDropDownObj.floatLabelType = 'Always';

      // Dans le cas du filtrage de la combo (input à l'intérieur)
      // Activation par allowFiltering: true
      // Le param text sert à déterminer sur quelle colonne il faut filtrer (le champ affiché dans la combo et non l'id, le plus souvent, donc besoin de ce param)
      this.editDropDownObj.allowFiltering = EditManagerTools.getCustomAttribute(args.column, 'allowFiltering', false) as boolean;
      const text = EditManagerTools.getCustomAttribute(args.column, 'text', null);

      if (this.editDropDownObj.allowFiltering && text) {
        this.editDropDownObj.fields.text = text as string;
      }

      this.editDropDownObj.value = valeur;

      this.editDropDownObj.appendTo(this.editDropDownElem);
    };
}
