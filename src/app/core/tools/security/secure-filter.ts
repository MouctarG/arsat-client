import { User } from '../../auth';

/**
 * Interface de filtrage de sécurité à implémentée dans les filters spécifique.
 * Force l'implémentation de transform et collect qui permettent la transformation des types T et donc de filtrer n'importe quel type de données
 */
export interface SpecificSecureFilter<T> {
  /**
   * Transforme le type T en type attendu en SecureFilter.
   * Dans le cas des éléments de navigation CoreUI, INavData, les enfants sont des "children" : on les transforme en secureChildren
   * @param children
   */
  transform(children?: T[]): SecureItem<T>[];

  /**
   * Rétablit le type T d'origine après traitement de l'élément.
   * Dans le cas des éléments de navigation CoreUI, les enfants ont précédemment été transformés en "secureChildren",
   * on les transforme maintenant un par un en "children" comme à l'origine
   * @param item
   */
  collect(item: SecureItem<T>): T;
}

/**
 * Interface définissant comment doit être formatée la donnée afin qu'elle soit filtrée en fonction des authorities
 * On ne connait pas encore secureChildren, qui ne sera typé en SecureItem seulement après avoir récursivement traîté les enfants de l'élément en cours
 */
export interface SecureItem<T>{
  authorities?: string[];
  secureChildren?: T[];
}

/**
 * Classe générique de filtrage.
 */
export abstract class SecureFilter {
  /**
   * T est le type des éléments à filtrer.
   * U est le type de la classe de filtrage spécifique utilisée pour filtrer les types T
   * @param filterClass Classe à instancier pour utiliser les méthodes de transformation relatives au type T à traîter
   * @param items Liste à filtrer
   * @param user Utilisateur actuellement connecté, ses authorities servent à déterminer si oui ou non une ressource doit être gardée dans la liste renvoyée
   * @returns Liste des éléments de type T après filtrage
   */
  public static apply<T, U extends SpecificSecureFilter<T>>(filterClass: new () => U, items: T[], user: User | null): T[] {
    if (!user) {
      return [];
    }

    const filterInstance = new filterClass();

    return filterInstance.transform(items).filter((item: SecureItem<T>) => {
      // on détermine si l'utilisateur possède au moins une authority demandée par l'item
      // si c'est le cas alors l'utilisateur a accès à la ressource et pourra afficher l'élément de navigation correspondant
      return !item.authorities ? true : item.authorities.some((authority) => User.hasAuthority(user, authority));
    }).map((item) => filterInstance.collect(({ ...item, secureChildren: item.secureChildren && this.apply(filterClass, item.secureChildren, user)})));
  }
}
