export interface IUser {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
  billing_address: string;
  shipping_address: string;
  country: string;
  phone: string;
}
