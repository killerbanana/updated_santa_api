import { SBModel } from "../sb/sb-interface";

export interface CommitteeModel {
  id: string;
  fromYear: string;
  toYear: string;
  title: string;
  description: string;
  chairman: string;
  viceChairman: string;
  members: Array<SBModel>;
}
