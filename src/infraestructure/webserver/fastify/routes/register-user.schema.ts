export interface IRegisterUserRouteInterface {
  Body: Body;
  Reply: Reply;
}

interface Body {
  username: string;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  bornDate: Date;
  sex: "M" | "F";
  password: string;
}

interface Reply {
  insertedId: string;
}

// TODO: Reutilizar interfaces e tipos ja refinidos
export const schema = {};
