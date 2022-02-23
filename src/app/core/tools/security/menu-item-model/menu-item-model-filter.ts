import { SpecificSecureFilter, SecureItem } from '../secure-filter';
import { SecureMenuItemModel } from './secure-menu-item-model';

export class MenuItemModelFilter implements SpecificSecureFilter<SecureMenuItemModel> {
    collect(item: SecureItem<SecureMenuItemModel>): SecureMenuItemModel {
      return {...item, items: item.secureChildren};
    }

    transform(children: SecureMenuItemModel[]): SecureItem<SecureMenuItemModel>[] {
      return children.map((item: SecureMenuItemModel) => ({...item, secureChildren: item.items && this.transform(item.items)}));
    }
}