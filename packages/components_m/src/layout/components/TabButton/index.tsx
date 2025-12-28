import { lazy } from "react";

export interface TabIProps {
  title: string;
  key: string;
  path: string;
  search: string;
  closable: boolean;
}

export const TabButton = lazy(() => import('./Inner'))
