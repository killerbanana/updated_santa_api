import { MinutesModel } from "./minutes-interface";

interface MinutesBuilderInterface extends MinutesModel {
    id: string;
    filePath: string;
    date: string;
    time: string;
    title: string;
    agenda: string;
    venue: string;
}

export class MinutesBuilder implements MinutesBuilderInterface {
    id: string = "";
    filePath: string = "";
    date: string = "";
    time: string = "";
    title: string = "";
    agenda: string = "";
    venue: string = "";

  constructor(minutes: MinutesBuilderInterface) {
    if (minutes.id) this.id = minutes.id;

    const { id, filePath, date, time } = minutes;
    const { title, agenda, venue } = minutes;

    this.id = id;
    this.filePath = filePath;
    this.date = date;
    this.time = time;
    this.title = title;
    this.agenda = agenda;
    this.venue = venue;
  
  }
}
