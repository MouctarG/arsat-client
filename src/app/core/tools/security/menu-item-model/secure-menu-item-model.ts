import { MenuItemModel } from '@syncfusion/ej2-angular-navigations';

/**
 * Interface rajoutant la sécurité pour le type de navigation INavData
 * INavData est le type de l'élement navigation utilisé par CoreUI
 */
export interface SecureMenuItemModel extends MenuItemModel {
    authorities?: string[];
    items?: SecureMenuItemModel[];
}