export interface IRegisterUserSchema {
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
  _id: string;
}
