import { SpecificSecureFilter, SecureItem } from '../secure-filter';
import { SecureINavData } from './secure-i-nav-data';

export class INavDataFilter implements SpecificSecureFilter<SecureINavData> {
    collect(item: SecureItem<SecureINavData>): SecureINavData {
        return {...item, children: item.secureChildren};
    }

    transform(children: SecureINavData[]): SecureItem<SecureINavData>[] {
        return children.map((item: SecureINavData) => ({...item, secureChildren: item.children && this.transform(item.children)}))
    }
}