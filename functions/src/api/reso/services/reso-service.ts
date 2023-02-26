import { firestore } from "firebase-admin";
import PaginationQuery from "src/core/types/pagination-query";
import { CountModel } from "src/models/authentication/count-interface";
import { ResolutionBuilder } from "src/models/reso/reso-builder";
import { ResolutionModel } from "src/models/reso/reso-interface";
import ResolutionMethods from "src/models/reso/reso-method";

class ResolutionService {
  static async create(data: ResolutionBuilder) {
    const batch = firestore().batch();
    const ResolutionRef = await ResolutionMethods.createRef();
    const ResolutionData = new ResolutionBuilder({
      id: ResolutionRef.doc.id,
      resolutionNumber: data.resolutionNumber,
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

    const resoCountSnapshot = await ResolutionMethods.getCountSnapshot();
    var getResoCount = await ResolutionMethods.getCount();
    getResoCount = getResoCount as CountModel;

    var updateCount = {
      count: getResoCount.count + 1,
    };

    batch.set(resoCountSnapshot.ref, Object.assign({}, updateCount));
    batch.set(ResolutionRef.doc, Object.assign({}, ResolutionData));
    await batch.commit();
    return { ResolutionData };
  }

  static async update(data: ResolutionBuilder, id: string) {
    const resolutionRef = await ResolutionMethods.update(data, id);
    return { resolutionRef };
  }

  static async delete(id: string) {
    const batch = firestore().batch();

    const resoCountSnapshot = await ResolutionMethods.getCountSnapshot();
    var getResoCount = await ResolutionMethods.getCount();

    getResoCount = getResoCount as CountModel;

    var updateCount = {
      count: getResoCount.count - 1,
    };

    batch.set(resoCountSnapshot.ref, Object.assign({}, updateCount));

    const resolutionRef = await ResolutionMethods.delete(id);

    await batch.commit();

    return { resolutionRef };
  }

  static async getAll(pagination: PaginationQuery) {
    const docs = await ResolutionMethods.getAll(pagination);

    const Resolution: Array<ResolutionModel> = [];

    for (const data of docs) {
      const ResolutionData = data.data();
      Resolution.push(ResolutionData);
    }

    let last;

    if (Resolution.length > 0) {
      last = Resolution[Resolution.length - 1].id as string;
    }

    const getCount = await ResolutionMethods.getCount();

    return {
      Resolution,
      last: last,
      getCount,
    };
  }

  static async getByReading(pagination: PaginationQuery, reading: string) {
    const docs = await ResolutionMethods.getAllByReading(pagination, reading);

    const resolution: Array<ResolutionModel> = [];

    for (const data of docs) {
      const resolutionData = data.data();
      resolution.push(resolutionData);
    }

    let last;

    if (resolution.length > 0) {
      last = resolution[resolution.length - 1].id as string;
    }

    const getCount = await ResolutionMethods.getCount();

    return {
      resolution,
      last: last,
      getCount,
    };
  }

  static async getByExtension(pagination: PaginationQuery, type: string) {
    const docs = await ResolutionMethods.getAllByExtension(pagination, type);

    const resolution: Array<ResolutionModel> = [];

    for (const data of docs) {
      const ResolutionData = data.data();
      resolution.push(ResolutionData);
    }

    let last;

    if (resolution.length > 0) {
      last = resolution[resolution.length - 1].id as string;
    }

    const getCount = await ResolutionMethods.getCount();

    return {
      resolution,
      last: last,
      getCount,
    };
  }

  static async seed(data: Array<ResolutionBuilder>) {
    data.map(async (data: ResolutionBuilder) => {
      const batch = firestore().batch();
      const cashloanRef = await ResolutionMethods.createRef();
      batch.set(cashloanRef.doc, Object.assign({}, data));
      console.log(cashloanRef.doc.id);
      await batch.commit();
    });
  }
}

export default ResolutionService;
