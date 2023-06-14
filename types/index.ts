// User type

export type TUser = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  birth_date: string;
  gender: string;
};

export type TRegisterUser = TUser & {
  agreement: boolean;
};
