import { AppropriationModel } from "./appropriation-interface";

interface AppropriationBuilderInterface extends AppropriationModel {
  id: string;
  appropriationNumber: string;
  series: string;
  date: string;
  title: string;
  author: string;
  filePath: string;
  time: string;
  type: string;
  size: string;
  tag: string;
  reading: string;
  created: string;
  updated: string;
}

export class AppropriationBuilder implements AppropriationBuilderInterface {
  id: string = "";
  appropriationNumber: string = "";
  series: string = "";
  date: string = "";
  title: string = "";
  author: string = "";
  filePath: string = "";
  time: string = "";
  type: string = "";
  size: string = "";
  tag: string = "";
  reading: string = "";
  created: string = "";
  updated: string = "";

  constructor(appropriation: AppropriationBuilderInterface) {
    if (appropriation.id) this.id = appropriation.id;

    const { appropriationNumber, series, title, author, tag, reading } =
      appropriation;
    const { date, created, updated } = appropriation;
    const { type, size, filePath, time } = appropriation;

    this.appropriationNumber = appropriationNumber;
    this.series = series;
    this.title = title;
    this.author = author;
    this.tag = tag;
    this.reading = reading;

    this.date = date;
    this.created = created;
    this.updated = updated;

    this.type = type;
    this.size = size;

    this.filePath = filePath;
    this.time = time;
  }
}
