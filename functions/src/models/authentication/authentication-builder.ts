import { AuthenticationModel } from "./authentication-interface";

interface AuthenticationBuilderInterface extends AuthenticationModel {
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
  privileges: Array<string>;
  role: string;
}

export class AuthenticationBuilder implements AuthenticationBuilderInterface {
  id: string = "";
  username: string = "";
  password: string = "";
  firstName: string = "";
  middleName: string = "";
  lastName: string = "";
  suffix: string = "";
  birthday: string = "";
  gender: string = "";
  address: string = "";
  contactNumber: string = "";
  filePath: string = "";
  privileges: Array<string> = [];
  role: string = "";

  constructor(authentication: AuthenticationBuilderInterface) {
    if (authentication.id) this.id = authentication.id;

    const { id, username, password } = authentication;
    const { firstName, middleName, lastName, suffix } = authentication;
    const { birthday, gender, address, contactNumber, filePath, privileges, role} = authentication;
    
    this.id = id;
    this.username = username;
    this.password = password;

    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.suffix = suffix;

    this.birthday = birthday;
    this.gender = gender;
    this.address = address;
    this.contactNumber = contactNumber;
    this.filePath = filePath;
    this.privileges = privileges;
    this.role = role;
  }
}
