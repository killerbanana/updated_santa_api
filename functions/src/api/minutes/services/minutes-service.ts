import { firestore } from "firebase-admin";
import PaginationQuery from "src/core/types/pagination-query";
import { MinutesBuilder } from "src/models/minutes/minutes-builder";
import MinutesMethods from "src/models/minutes/minutes-methods";
import { MinutesModel } from "src/models/minutes/minutes-interface";

class MinutesService {
  static async create(data: MinutesBuilder) {
    const batch = firestore().batch();
    const minutesRef = await MinutesMethods.createRef();

    const minutesData = new MinutesBuilder({
      id: minutesRef.doc.id,
      filePath: data.filePath,
      date: data.date,
      time: data.time,
      title: data.title,
      agenda: data.agenda,
      venue: data.venue,
    });
    batch.set(minutesRef.doc, Object.assign({}, minutesData));
    await batch.commit();
    return { minutesData };
  }

  static async getAll(pagination: PaginationQuery) {
    const docs = await MinutesMethods.getAll(pagination);

    const minutes: Array<MinutesModel> = [];

    for (const data of docs) {
      const minutesData = data.data();
      minutes.push(minutesData);
    }

    let last;

    if (minutes.length > 0) {
      last = minutes[minutes.length - 1].id as string;
    }

    const getCount = await MinutesMethods.getCount();

    return {
      minutes,
      last: last,
      getCount,
    };
  }

  static async delete(id: string) {
    const authRef = await MinutesMethods.delete(id);
    return { authRef };
  }

  static async update(data: MinutesBuilder, id: string) {
    const authRef = await MinutesMethods.update(data, id);
    return { authRef };
  }
}

export default MinutesService;
