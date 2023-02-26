import { firestore } from "firebase-admin";
import PaginationQuery from "src/core/types/pagination-query";
import { CountModel } from "src/models/authentication/count-interface";
import { TricyBuilder } from "src/models/tricy/tricy-builder";
import { TricyModel } from "src/models/tricy/tricy-interface";
import TricyMethods from "src/models/tricy/tricy-method";

class TricyService {
  static async create(data: TricyBuilder) {
    const batch = firestore().batch();
    const TricyRef = await TricyMethods.createRef();
    const TricyData = new TricyBuilder({
      id: TricyRef.doc.id,
      name: data.name,
      barangay: data.barangay,
      civilStatus: data.civilStatus,
      reason: data.reason,
      make: data.make,
      motorNo: data.motorNo,
      chassisNo: data.chassisNo,
      plateNo: data.plateNo,
      noOfUnits: data.noOfUnits,
      franchiseNo: data.franchiseNo,
      taxCert: data.taxCert,
      orNo: data.orNo,
      dateFranchise: data.dateFranchise,
      year: data.year,
      status: data.status,
      fee: data.fee,
      created: data.created,
      filePath: data.filePath,
    });

    const resoCountSnapshot = await TricyMethods.getCountSnapshot();
    var getResoCount = await TricyMethods.getCount();
    getResoCount = getResoCount as CountModel;

    var updateCount = {
      count: getResoCount.count + 1,
    };

    batch.set(resoCountSnapshot.ref, Object.assign({}, updateCount));
    batch.set(TricyRef.doc, Object.assign({}, TricyData));

    await batch.commit();
    return { TricyData };
  }

  static async update(data: TricyBuilder, id: string) {
    const TricyRef = await TricyMethods.update(data, id);
    return { TricyRef };
  }

  static async delete(id: string) {
    const TricyRef = await TricyMethods.delete(id);
    const batch = firestore().batch();

    const resoCountSnapshot = await TricyMethods.getCountSnapshot();
    var getResoCount = await TricyMethods.getCount();

    getResoCount = getResoCount as CountModel;

    var updateCount = {
      count: getResoCount.count - 1,
    };

    batch.set(resoCountSnapshot.ref, Object.assign({}, updateCount));
    batch.commit();
    return { TricyRef };
  }

  static async getAll(pagination: PaginationQuery) {
    const docs = await TricyMethods.getAll(pagination);

    const Tricy: Array<TricyModel> = [];

    for (const data of docs) {
      const TricyData = data.data();
      Tricy.push(TricyData);
    }

    let last;

    if (Tricy.length > 0) {
      last = Tricy[Tricy.length - 1].id as string;
    }

    const getCount = await TricyMethods.getCount();

    return {
      Tricy,
      last: last,
      getCount,
    };
  }

  static async seed(data: Array<TricyBuilder>) {
    data.map(async (data: TricyBuilder) => {
      const batch = firestore().batch();
      const cashloanRef = await TricyMethods.createRef();
      batch.set(cashloanRef.doc, Object.assign({}, data));
      console.log(cashloanRef.doc.id);
      await batch.commit();
    });
  }
}

export default TricyService;
