import { ActionType } from "redux/types";
import { MovieIT, movieTemplate } from "interfaces/MovieInterface";
interface showMenu {
  type: ActionType.SHOW_MENU;
  payload: boolean;
}
interface loginServer {
  type: ActionType.LOGIN;
  user: string;
  token: string;
  role: string;
  name: string;
}
interface search {
  type: ActionType.SEARCH;
  payload: String;
}
interface scroll {
  type: ActionType.SCROLL;
  page: String;
  payload: Number;
}
interface modal {
  type: ActionType.MODAL;
  id: string;
  payload: Boolean;
}
interface modalSerie {
  type: ActionType.MODAL_SERIE;
  id: string;
  payload: Boolean;
}
interface modalReport {
  type: ActionType.MODAL_REPORT;
  show: boolean;
  idMovie: string;
  title: string;
  imageS: string;
  imageL: string;
  message: string;
}

export type ActionsInterface =
  | showMenu
  | loginServer
  | search
  | scroll
  | modal
  | modalSerie
  | modalReport;
