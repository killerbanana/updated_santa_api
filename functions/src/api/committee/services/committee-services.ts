import { firestore } from "firebase-admin";
import PaginationQuery from "src/core/types/pagination-query";
import { CountModel } from "src/models/authentication/count-interface";
import { CommitteeBuilder } from "src/models/committee/committee-builder";
import { CommitteeModel } from "src/models/committee/committee-interface";
import CommitteeMethods from "src/models/committee/committee-methods";

class CommitteeService {
  static async create(data: CommitteeBuilder) {
    const batch = firestore().batch();
    const CommitteeRef = await CommitteeMethods.createRef();
    const CommitteeData = new CommitteeBuilder({
      id: CommitteeRef.doc.id,
      fromYear: data.fromYear,
      toYear: data.toYear,
      title: data.title,
      description: data.description,
      chairman: data.chairman,
      viceChairman: data.viceChairman,
      members: data.members,
    });

    const CommitteeCountSnapshot = await CommitteeMethods.getCountSnapshot();
    var getCommitteeCount = await CommitteeMethods.getCount();
    getCommitteeCount = getCommitteeCount as CountModel;

    var updateCount = {
      count: getCommitteeCount.count + 1,
    };

    batch.set(CommitteeCountSnapshot.ref, Object.assign({}, updateCount));
    batch.set(CommitteeRef.doc, Object.assign({}, CommitteeData));
    await batch.commit();
    return { CommitteeData };
  }

  static async update(data: CommitteeBuilder, id: string) {
    const CommitteeRef = await CommitteeMethods.update(data, id);
    return { CommitteeRef };
  }

  static async delete(id: string) {
    const batch = firestore().batch();

    const CommitteeCountSnapshot = await CommitteeMethods.getCountSnapshot();
    var getCommitteeCount = await CommitteeMethods.getCount();

    getCommitteeCount = getCommitteeCount as CountModel;

    var updateCount = {
      count: getCommitteeCount.count - 1,
    };

    batch.set(CommitteeCountSnapshot.ref, Object.assign({}, updateCount));

    const CommitteeRef = await CommitteeMethods.delete(id);

    await batch.commit();

    return { CommitteeRef };
  }

  static async getAll(pagination: PaginationQuery) {
    const docs = await CommitteeMethods.getAll(pagination);

    const Committee: Array<CommitteeModel> = [];

    for (const data of docs) {
      const CommitteeData = data.data();
      Committee.push(CommitteeData);
    }

    let last;

    if (Committee.length > 0) {
      last = Committee[Committee.length - 1].id as string;
    }

    const getCount = await CommitteeMethods.getCount();

    return {
      Committee,
      last: last,
      getCount,
    };
  }

  static async getByReading(pagination: PaginationQuery, reading: string) {
    const docs = await CommitteeMethods.getAllByReading(pagination, reading);

    const Committee: Array<CommitteeModel> = [];

    for (const data of docs) {
      const CommitteeData = data.data();
      Committee.push(CommitteeData);
    }

    let last;

    if (Committee.length > 0) {
      last = Committee[Committee.length - 1].id as string;
    }

    const getCount = await CommitteeMethods.getCount();

    return {
      Committee,
      last: last,
      getCount,
    };
  }

  static async getByExtension(pagination: PaginationQuery, type: string) {
    const docs = await CommitteeMethods.getAllByExtension(pagination, type);

    const Committee: Array<CommitteeModel> = [];

    for (const data of docs) {
      const CommitteeData = data.data();
      Committee.push(CommitteeData);
    }

    let last;

    if (Committee.length > 0) {
      last = Committee[Committee.length - 1].id as string;
    }

    const getCount = await CommitteeMethods.getCount();

    return {
      Committee,
      last: last,
      getCount,
    };
  }

  static async getById(Id: string) {
    const result = await CommitteeMethods.getById(Id);
    return {
      result,
    };
  }

  static async getByYear(fromYear: string, toYear: string) {
    const docs = await CommitteeMethods.getByYear(fromYear, toYear);

    const Committee: Array<CommitteeModel> = [];

    for (const data of docs) {
      const CommitteeData = data.data();
      Committee.push(CommitteeData);
    }

    let last;

    if (Committee.length > 0) {
      last = Committee[Committee.length - 1].id as string;
    }

    const getCount = await CommitteeMethods.getCount();

    return {
      Committee,
      last: last,
      getCount,
    };
  }

  static async seed(data: Array<CommitteeBuilder>) {
    data.map(async (data: CommitteeBuilder) => {
      const batch = firestore().batch();
      const cashloanRef = await CommitteeMethods.createRef();
      batch.set(cashloanRef.doc, Object.assign({}, data));
      console.log(cashloanRef.doc.id);
      await batch.commit();
    });
  }
}

export default CommitteeService;
