import { Column } from '@syncfusion/ej2-angular-grids';

export abstract class EditManagerTools {
    public static switchColumnVisibility(column: Column, field: string): void {
        if (!column || ! column.customAttributes) {
          return;
        }
        const visibility = column.customAttributes[field];
    
        column.visible = visibility === undefined ? true : visibility as boolean;
      }
  
      /**
       * Méthode pour récupérer la valeur d'un attribut particulier
       * @param col
       * @param attrName
       * @param defautlValue
       * @returns
       */
       public static getCustomAttribute(col: Column, attrName: string, defautlValue: object | string | boolean | undefined | null): object | string | boolean | undefined | null {
        if (col.customAttributes[attrName] !== undefined)
          return col.customAttributes[attrName];
    
        return defautlValue;
      }
} 