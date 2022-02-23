import { MultiSelect } from '@syncfusion/ej2-angular-dropdowns';
import { Column } from '@syncfusion/ej2-angular-grids';
import { DataManager } from '@syncfusion/ej2-data';
import { EditManagerTools } from './EditManagerTools';

export class CustomMultiSelect {
    public dataManager?: string[] | DataManager | { [key: string]: Object; }[] | number[] | boolean[];

    public editMultiSelectElem: HTMLInputElement;
    public editMultiSelectObj: MultiSelect;

    public setDataManager(dataManager?: string[] | DataManager | { [key: string]: Object; }[] | number[] | boolean[]): void {
      this.dataManager = dataManager;
    }


    public create = () => {
      this.editMultiSelectElem = document.createElement('input');
      return this.editMultiSelectElem;
    };

    public read = () => {
      const result: {id: number}[] = [];

      if(this.editMultiSelectObj.value.length) {
        this.editMultiSelectObj.value.forEach((value: any) => {
          result.push({id: value});
        });
      }

      return result;
    };

    public destroy = () => {
      this.editMultiSelectObj.destroy();
    };

    public write = (args: { column: Column; rowData: { [x: string]: any; }; }) => {
      this.editMultiSelectObj = new MultiSelect({
        dataSource: this.dataManager,
        //itemTemplate: EditManagerTools.getCustomAttribute(args.column, 'itemTemplate', undefined) as string,
        //valueTemplate: EditManagerTools.getCustomAttribute(args.column, 'itemTemplate', undefined) as string,
        placeholder: EditManagerTools.getCustomAttribute(args.column, 'placeholder', 'Choisissez') as string,
        fields: {
          text: EditManagerTools.getCustomAttribute(args.column, 'childName', 'name') as string,
          value: EditManagerTools.getCustomAttribute(args.column, 'childId', 'id') as string
        }
      });

      const nomChamp = EditManagerTools.getCustomAttribute(args.column, 'value', 'id') as string;
      const data: {id: number}[] = args.rowData[nomChamp];
      let value: number[] = [];

      if (data && data.length) {
        data.forEach(({id}) => {
          value.push(id);
        });
      }

      this.editMultiSelectObj.value = value;


      // Force le placeholder à être affiché au dessus de l'input
      this.editMultiSelectObj.floatLabelType = 'Always';

      // Dans le cas du filtrage de la combo (input à l'intérieur)
      // Activation par allowFiltering: true
      this.editMultiSelectObj.allowFiltering = EditManagerTools.getCustomAttribute(args.column, 'allowFiltering', false) as boolean;

      this.editMultiSelectObj.appendTo(this.editMultiSelectElem);
    };
}