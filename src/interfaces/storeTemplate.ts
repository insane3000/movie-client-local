export type AppInterface = {
  showMenu: boolean;
  search: string;
  report: {
    show: boolean;
    idMovie: string;
    title: string;
    imageS: string;
    imageL: string;
    message: string;
  };
  scroll: {
    home: number;
    movies: number;
    premieres: number;
    search: number;
  };
  modal: {
    show: boolean;
    id: string;
  };
  modalSerie: {
    show: boolean;
    id: string;
  };
  login: {
    user: string;
    token: string;
    role: string;
    name: string;
  };
  // CashRegister: CashRegisterIT;
};
export const appTemplate: AppInterface = {
  showMenu: false,
  search: "",
  report: {
    show: false,
    idMovie: "",
    title: "",
    imageS: "",
    imageL: "",
    message: "",
  },
  scroll: {
    home: 0,
    movies: 0,
    premieres: 0,
    search: 0,
  },
  modal: {
    show: false,
    id: "",
  },
  modalSerie: {
    show: false,
    id: "",
  },
  login: {
    user: "",
    token: "",
    role: "",
    name: "",
  },
  // CashRegister: cashRegisterTemplate,
};

export interface StoreInterface {
  app: AppInterface;
}
export const storeTemplate: StoreInterface = {
  app: appTemplate,
};
