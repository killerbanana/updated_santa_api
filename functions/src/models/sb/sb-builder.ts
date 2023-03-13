import { SBModel } from "./sb-interface";

interface SBBuilderInterface extends SBModel {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  birthday: string;
  gender: string;
  address: string;
  contactNumber: string;
  position: string;
  title: string;
  fromYear: string;
  toYear: string;
}

export class SBBuilder implements SBBuilderInterface {
  id: string = "";
  firstName: string = "";
  middleName: string = "";
  lastName: string = "";
  suffix: string = "";
  birthday: string = "";
  gender: string = "";
  address: string = "";
  contactNumber: string = "";
  position: string = "";
  title: string = "";
  fromYear: string = "";
  toYear: string = "";

  constructor(SB: SBBuilderInterface) {
    if (SB.id) this.id = SB.id;

    const { firstName, middleName, lastName, suffix } = SB;
    const { birthday, gender, address, contactNumber } = SB;
    const { position, title } = SB;
    const { fromYear, toYear } = SB;

    this.firstName = firstName;
    this.middleName = middleName;
    this.title = title;
    this.lastName = lastName;
    this.suffix = suffix;

    this.birthday = birthday;
    this.gender = gender;
    this.address = address;
    this.contactNumber = contactNumber;

    this.position = position;
    this.title = title;

    this.fromYear = fromYear;
    this.toYear = toYear;
  }
}
