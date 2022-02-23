import {IEditCell} from '@syncfusion/ej2-angular-grids';
import {DataManager} from '@syncfusion/ej2-data';
import {CustomDropdown} from './customDropdown';
import {CustomMultiSelect} from './customMultiSelect';

export class CustomEditManager {
  public editparams: IEditCell;

  constructor(dataManager: string[] | DataManager | { [key: string]: Object; }[] | number[] | boolean[], component: CustomMultiSelect | CustomDropdown = new CustomDropdown()) {
    component.setDataManager(dataManager);
    this.editparams = component;
  }
}
