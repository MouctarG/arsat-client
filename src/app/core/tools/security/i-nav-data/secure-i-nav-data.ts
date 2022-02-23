import { INavData } from '@coreui/angular';

/**
 * Interface rajoutant la sécurité pour le type de navigation INavData
 * INavData est le type de l'élement navigation utilisé par CoreUI
 */
export interface SecureINavData extends INavData {
    authorities?: string[];
    children?: SecureINavData[];
    id?: string;
}
