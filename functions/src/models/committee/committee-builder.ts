import { SBModel } from "../sb/sb-interface";
import { CommitteeModel } from "./committee-interface";

interface CommitteeBuilderInterface extends CommitteeModel {
  id: string;
  fromYear: string;
  toYear: string;
  title: string;
  description: string;
  chairman: string;
  viceChairman: string;
  members: Array<SBModel>;
}

export class CommitteeBuilder implements CommitteeBuilderInterface {
  id: string = "";
  fromYear: string = "";
  toYear: string = "";
  title: string = "";
  description: string = "";
  chairman: string = "";
  viceChairman: string = "";
  members: Array<SBModel> = [];

  constructor(Comittee: CommitteeBuilderInterface) {
    if (Comittee.id) this.id = Comittee.id;

    const { fromYear, toYear } = Comittee;

    const { title, description } = Comittee;

    const { chairman, viceChairman, members } = Comittee;

    this.fromYear = fromYear;
    this.toYear = toYear;

    this.title = title;
    this.description = description;

    this.chairman = chairman;
    this.viceChairman = viceChairman;
    this.members = members;
  }
}
