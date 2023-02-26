import { firestore } from "firebase-admin";
import PaginationQuery from "src/core/types/pagination-query";
import { CountModel } from "src/models/authentication/count-interface";
import { OrdinanceBuilder } from "src/models/ordinance/ordinance-builder";
import { OrdinanceModel } from "src/models/ordinance/ordinance-interface";
import OrdinanceMethods from "src/models/ordinance/ordinance-method";

class OrdinanceService {
  static async create(data: OrdinanceBuilder) {
    const batch = firestore().batch();
    const ordinanceRef = await OrdinanceMethods.createRef();
    const ordinanceData = new OrdinanceBuilder({
      id: ordinanceRef.doc.id,
      ordinanceNumber: data.ordinanceNumber,
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
    const resoCountSnapshot = await OrdinanceMethods.getCountSnapshot();
    var getResoCount = await OrdinanceMethods.getCount();
    getResoCount = getResoCount as CountModel;

    var updateCount = {
      count: getResoCount.count + 1,
    };

    batch.set(resoCountSnapshot.ref, Object.assign({}, updateCount));

    batch.set(ordinanceRef.doc, Object.assign({}, ordinanceData));
    await batch.commit();

    return { ordinanceData };
  }

  static async update(data: OrdinanceBuilder, id: string) {
    const ordinanceRef = await OrdinanceMethods.update(data, id);
    return { ordinanceRef };
  }

  static async delete(id: string) {
    const batch = firestore().batch();

    const resoCountSnapshot = await OrdinanceMethods.getCountSnapshot();
    var getResoCount = await OrdinanceMethods.getCount();

    getResoCount = getResoCount as CountModel;

    var updateCount = {
      count: getResoCount.count - 1,
    };

    batch.set(resoCountSnapshot.ref, Object.assign({}, updateCount));
    const ordinanceRef = await OrdinanceMethods.delete(id);
    await batch.commit();
    return { ordinanceRef };
  }

  static async getAll(pagination: PaginationQuery) {
    const docs = await OrdinanceMethods.getAll(pagination);

    const ordinance: Array<OrdinanceModel> = [];

    for (const data of docs) {
      const ordinanceData = data.data();
      ordinance.push(ordinanceData);
    }

    let last;

    if (ordinance.length > 0) {
      last = ordinance[ordinance.length - 1].id as string;
    }

    const getCount = await OrdinanceMethods.getCount();

    return {
      ordinance,
      last: last,
      getCount,
    };
  }

  static async getByReading(pagination: PaginationQuery, reading: string) {
    const docs = await OrdinanceMethods.getAllByReading(pagination, reading);

    const ordinance: Array<OrdinanceModel> = [];

    for (const data of docs) {
      const ordinanceData = data.data();
      ordinance.push(ordinanceData);
    }

    let last;

    if (ordinance.length > 0) {
      last = ordinance[ordinance.length - 1].id as string;
    }

    const getCount = await OrdinanceMethods.getCount();

    return {
      ordinance,
      last: last,
      getCount,
    };
  }

  static async getByExtension(pagination: PaginationQuery, type: string) {
    const docs = await OrdinanceMethods.getAllByExtension(pagination, type);

    const ordinance: Array<OrdinanceModel> = [];

    for (const data of docs) {
      const ordinanceData = data.data();
      ordinance.push(ordinanceData);
    }

    let last;

    if (ordinance.length > 0) {
      last = ordinance[ordinance.length - 1].id as string;
    }

    const getCount = await OrdinanceMethods.getCount();

    return {
      ordinance,
      last: last,
      getCount,
    };
  }

  static async seed(data: Array<OrdinanceBuilder>) {
    data.map(async (data: OrdinanceBuilder) => {
      const batch = firestore().batch();
      const cashloanRef = await OrdinanceMethods.createRef();
      batch.set(cashloanRef.doc, Object.assign({}, data));
      console.log(cashloanRef.doc.id);
      await batch.commit();
    });
  }
}

export default OrdinanceService;
