export interface AuthenticationModel {
  id: string;
  username: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  birthday: string;
  gender: string;
  address: string;
  contactNumber: string;
  filePath: string;
  privileges: Array<String>;
  role: string;
}
