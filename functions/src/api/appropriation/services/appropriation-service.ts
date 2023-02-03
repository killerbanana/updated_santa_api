import { firestore } from "firebase-admin";
import PaginationQuery from "src/core/types/pagination-query";
import { AppropriationBuilder } from "src/models/appropriation/appropriation-builder";
import { AppropriationModel } from "src/models/appropriation/appropriation-interface";
import AppropriationMethods from "src/models/appropriation/appropriation-method";

class AppropriationService {
  static async create(data: AppropriationBuilder) {
    const batch = firestore().batch();
    const appropriationRef = await AppropriationMethods.createRef();
    const appropriationData = new AppropriationBuilder({
      id: appropriationRef.doc.id,
      appropriationNumber: data.appropriationNumber,
      series: data.series.toString(),
      date: data.date,
      title: data.title,
      author: data.author,
      filePath: data.filePath,
      time: data.time,
      type: data.type,
      size: data.size,
      tag: data.tag,
      reading: data.reading,
      created: data.created,
      updated: data.created,
    });
    batch.set(appropriationRef.doc, Object.assign({}, appropriationData));
    await batch.commit();

    return { appropriationData };
  }

  static async update(data: AppropriationBuilder, id: string) {
    const appropriationRef = await AppropriationMethods.update(data, id);
    return { appropriationRef };
  }

  static async delete(id: string) {
    const appropriationRef = await AppropriationMethods.delete(id);
    return { appropriationRef };
  }

  static async getAll(pagination: PaginationQuery) {
    const docs = await AppropriationMethods.getAll(pagination);

    const appropriation: Array<AppropriationModel> = [];

    for (const data of docs) {
      const appropriationData = data.data();
      appropriation.push(appropriationData);
    }

    let last;

    if (appropriation.length > 0) {
      last = appropriation[appropriation.length - 1].id as string;
    }

    const getCount = await AppropriationMethods.getCount();

    return {
      appropriation,
      last: last,
      getCount,
    };
  }

  // static async seed(data: Array<AppropriationBuilder>) {
  //   data.map(async (data: AppropriationBuilder) => {
  //     const batch = firestore().batch();
  //     const appropriationRef = await AppropriationMethods.createRef();
  //     const appropriationData = new AppropriationBuilder({
  //       id: appropriationRef.doc.id,
  //       appropriationNumber: data.appropriationNumber.toString(),
  //       series: data.series.toString(),
  //       date: data.date,
  //       title: data.title,
  //       author: data.author,
  //       filePath: "",
  //       time: data.time,
  //       type: ".pdf",
  //       size: data.size,
  //       tag: data.tag,
  //       reading: data.reading,
  //       created: data.created,
  //       updated: data.created,
  //     });
  //     batch.set(appropriationRef.doc, Object.assign({}, appropriationData));
  //     console.log(appropriationRef.doc.id);
  //     await batch.commit();
  //   });
  // }
}

export default AppropriationService;
