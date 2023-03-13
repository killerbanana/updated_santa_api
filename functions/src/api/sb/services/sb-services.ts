import { firestore } from "firebase-admin";
import PaginationQuery from "src/core/types/pagination-query";
import { CountModel } from "src/models/authentication/count-interface";
import { SBBuilder } from "src/models/sb/sb-builder";
import { SBModel } from "src/models/sb/sb-interface";
import SBMethods from "src/models/sb/sb-methods";

class SBService {
  static async create(data: SBBuilder) {
    const batch = firestore().batch();
    const SBRef = await SBMethods.createRef();
    const SBData = new SBBuilder({
      id: SBRef.doc.id,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      suffix: data.suffix,
      birthday: data.birthday,
      gender: data.gender,
      address: data.address,
      contactNumber: data.contactNumber,
      position: data.position,
      title: data.title,
      fromYear: data.fromYear,
      toYear: data.toYear,
    });

    const sbCountSnapshot = await SBMethods.getCountSnapshot();
    var getsbCount = await SBMethods.getCount();
    getsbCount = getsbCount as CountModel;

    var updateCount = {
      count: getsbCount.count + 1,
    };

    batch.set(sbCountSnapshot.ref, Object.assign({}, updateCount));
    batch.set(SBRef.doc, Object.assign({}, SBData));
    await batch.commit();
    return { SBData };
  }

  static async update(data: SBBuilder, id: string) {
    const SBRef = await SBMethods.update(data, id);
    return { SBRef };
  }

  static async delete(id: string) {
    const batch = firestore().batch();

    const sbCountSnapshot = await SBMethods.getCountSnapshot();
    var getsbCount = await SBMethods.getCount();

    getsbCount = getsbCount as CountModel;

    var updateCount = {
      count: getsbCount.count - 1,
    };

    batch.set(sbCountSnapshot.ref, Object.assign({}, updateCount));

    const SBRef = await SBMethods.delete(id);

    await batch.commit();

    return { SBRef };
  }

  static async getAll(pagination: PaginationQuery) {
    const docs = await SBMethods.getAll(pagination);

    const SB: Array<SBModel> = [];

    for (const data of docs) {
      const SBData = data.data();
      SB.push(SBData);
    }

    let last;

    if (SB.length > 0) {
      last = SB[SB.length - 1].id as string;
    }

    const getCount = await SBMethods.getCount();

    return {
      SB,
      last: last,
      getCount,
    };
  }

  static async getByReading(pagination: PaginationQuery, reading: string) {
    const docs = await SBMethods.getAllByReading(pagination, reading);

    const SB: Array<SBModel> = [];

    for (const data of docs) {
      const SBData = data.data();
      SB.push(SBData);
    }

    let last;

    if (SB.length > 0) {
      last = SB[SB.length - 1].id as string;
    }

    const getCount = await SBMethods.getCount();

    return {
      SB,
      last: last,
      getCount,
    };
  }

  static async getByExtension(pagination: PaginationQuery, type: string) {
    const docs = await SBMethods.getAllByExtension(pagination, type);

    const SB: Array<SBModel> = [];

    for (const data of docs) {
      const SBData = data.data();
      SB.push(SBData);
    }

    let last;

    if (SB.length > 0) {
      last = SB[SB.length - 1].id as string;
    }

    const getCount = await SBMethods.getCount();

    return {
      SB,
      last: last,
      getCount,
    };
  }

  static async seed(data: Array<SBBuilder>) {
    data.map(async (data: SBBuilder) => {
      const batch = firestore().batch();
      const cashloanRef = await SBMethods.createRef();
      batch.set(cashloanRef.doc, Object.assign({}, data));
      console.log(cashloanRef.doc.id);
      await batch.commit();
    });
  }
}

export default SBService;
