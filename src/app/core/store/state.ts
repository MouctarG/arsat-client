import { User } from '../auth';

export interface State {
  accessToken: string | null;
  isAuthenticated: boolean;
  user: User | null;
  footerMessage: string | null;
  isApiConnected: boolean;
  sidebarShowing: boolean;
  sidebarLocked: boolean;
  pageName: string | null;
  navReady: boolean;
}

export const stateDefaults: State = {
  accessToken: null,
  isAuthenticated: false,
  user: null,
  footerMessage: null,
  isApiConnected: true,
  sidebarShowing: true,
  sidebarLocked: true,
  pageName: null,
  navReady: true
};
