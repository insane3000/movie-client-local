import { ActionType } from "redux/types";
import { Dispatch } from "redux";
import { ActionsInterface } from "interfaces/ActionsInterface";

// !Seteando SHOW MENU
export const showMenu = (data: boolean) => (dispatch: Dispatch<ActionsInterface>) => {
  // console.log(data);
  dispatch({
    type: ActionType.SHOW_MENU,
    payload: data,
  });
};
// !Seteando LOGIN
export const loginServer =
  (user: string, token: string, role: string, name: string) =>
  (dispatch: Dispatch<ActionsInterface>) => {
    // console.log(data);
    dispatch({
      type: ActionType.LOGIN,
      user,
      token,
      role,
      name,
    });
  };
// !Seteando SEARCH
export const search = (data: string) => (dispatch: Dispatch<ActionsInterface>) => {
  // console.log(data);
  dispatch({
    type: ActionType.SEARCH,
    payload: data,
  });
};
// !Seteando SCROLL
export const restartScroll =
  (page: String, data: Number) => (dispatch: Dispatch<ActionsInterface>) => {
    // console.log(page, data);
    dispatch({
      type: ActionType.SCROLL,
      page,
      payload: data,
    });
  };
// !Seteando MODAL
export const setModal = (id: string, data: Boolean) => (dispatch: Dispatch<ActionsInterface>) => {
  //   console.log(data);
  dispatch({
    type: ActionType.MODAL,
    id: id,
    payload: data,
  });
};
// !Seteando  SERIE
export const setModalSerie =
  (id: string, data: Boolean) => (dispatch: Dispatch<ActionsInterface>) => {
    //     console.log(id);
    dispatch({
      type: ActionType.MODAL_SERIE,
      id: id,
      payload: data,
    });
  };

// !Seteando  MODAL REPORT
export const setModalReport =
  (
    show: boolean,
    idMovie: string,
    title: string,
    imageS: string,
    imageL: string,
    message: string
  ) =>
  (dispatch: Dispatch<ActionsInterface>) => {
    //     console.log(show, id, title, img, message);
    dispatch({
      type: ActionType.MODAL_REPORT,
      show,
      idMovie,
      title,
      imageS,
      imageL,
      message,
    });
  };
