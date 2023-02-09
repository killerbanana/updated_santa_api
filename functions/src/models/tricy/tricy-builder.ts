import { TricyModel } from "./tricy-interface";

interface TricyBuilderInterface extends TricyModel {
  id: string;
  name: string;
  barangay: string;
  civilStatus: string;
  reason: string;
  make: string;
  motorNo: string;
  chassisNo: string;
  plateNo: string;
  noOfUnits: string;
  franchiseNo: string;
  taxCert: string;
  orNo: string;
  dateFranchise: string;
  year: string;
  status: string;
  fee: string;
  created: string;
}

export class TricyBuilder implements TricyBuilderInterface {
  id: string = "";
  name: string = "";
  barangay: string = "";
  civilStatus: string = "";
  reason: string = "";
  make: string = "";
  motorNo: string = "";
  chassisNo: string = "";
  plateNo: string = "";
  noOfUnits: string = "";
  franchiseNo: string = "";
  taxCert: string = "";
  orNo: string = "";
  dateFranchise: string = "";
  year: string = "";
  status: string = "";
  fee: string = "";
  created: string = "";
  filePath: string = "";

  constructor(Tricy: TricyBuilderInterface) {
    if (Tricy.id) this.id = Tricy.id;

    const { name, barangay, civilStatus, reason } = Tricy;
    const { make, motorNo, chassisNo, plateNo, noOfUnits } = Tricy;
    const {
      franchiseNo,
      taxCert,
      dateFranchise,
      year,
      status,
      fee,
      created,
      filePath,
    } = Tricy;

    this.name = name;
    this.barangay = barangay;
    this.civilStatus = civilStatus;
    this.reason = reason;

    this.make = make;
    this.motorNo = motorNo;
    this.chassisNo = chassisNo;
    this.plateNo = plateNo;
    this.noOfUnits = noOfUnits;

    this.franchiseNo = franchiseNo;
    this.taxCert = taxCert;
    this.dateFranchise = dateFranchise;
    this.year = year;
    this.status = status;
    this.fee = fee;
    this.created = created;
    this.filePath = filePath;
  }
}
