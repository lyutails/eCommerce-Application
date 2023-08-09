export interface CustomerFields {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  building: string;
  apartment: string;
}

export interface CustomerParam {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  addresses: {
    streetName: string;
    streetNumber: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    building: string;
    apartment: string;
  }[];
}

export interface InputFields {
  email: InputCustomFields;
  password: InputCustomFields;
}

export interface InputCustomFields {
  type: string;
  placeholder: string;
  img1: string;
  img2?: string;
}
