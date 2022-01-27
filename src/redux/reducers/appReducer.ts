import { ActionType } from "redux/types";
import { ActionsInterface } from "interfaces/ActionsInterface";
//* INTERFACE APP
import { AppInterface, appTemplate } from "interfaces/storeTemplate";

const initialState: AppInterface = appTemplate;

const appReducer = (state = initialState, action: ActionsInterface) => {
  // console.log(action);
  switch (action.type) {
    case ActionType.SHOW_MENU:
      return {
        ...state,
        showMenu: action.payload,
      };
    case ActionType.LOGIN:
      return {
        ...state,
        login: {
          ...state.login,
          user: action.user,
          token: action.token,
          role: action.role,
          name: action.name,
        },
      };
    case ActionType.SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case ActionType.SCROLL:
      return {
        ...state,
        scroll: {
          ...state.scroll,
          [action.page.toString()]: action.payload,
        },
      };
    case ActionType.MODAL:
      return {
        ...state,
        modal: { ...state.modal, id: action.id, show: action.payload },
      };
    case ActionType.MODAL_SERIE:
      return {
        ...state,
        modalSerie: { ...state.modalSerie, id: action.id, show: action.payload },
      };
    case ActionType.MODAL_REPORT:
      return {
        ...state,
        report: {
          ...state.report,
          show: action.show,
          idMovie: action.idMovie,
          title: action.title,
          imageS: action.imageS,
          imageL: action.imageL,
          message: action.message,
        },
      };
    default:
      return state;
  }
};

export default appReducer;
