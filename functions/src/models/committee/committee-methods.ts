import * as _firestore from "@google-cloud/firestore";
import { firestore } from "firebase-admin";
import Collection from "src/core/enums/collections";
import BadRequest from "src/core/exceptions/bad-request";
import PaginationQuery from "src/core/types/pagination-query";
import { CommitteeBuilder } from "./committee-builder";
import { CommitteeModel } from "./committee-interface";
class CommitteeMethods {
  static collection: _firestore.CollectionReference = firestore().collection(
    `${Collection.SANTA_COMMITTEE}`
  );

  static converter = {
    toFirestore(data: CommitteeModel): FirebaseFirestore.DocumentData {
      return data;
    },
    fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot) => {
      const data = snapshot.data();

      return {
        id: snapshot.id,
        ...data,
      } as CommitteeModel;
    },
  };

  static async createRef() {
    const doc = this.collection.doc();

    return {
      id: doc.id,
      doc: this.collection.doc(doc.id),
    };
  }

  static async get(docId: string) {
    const snapshot = await this.collection.doc(docId).get();

    if (!snapshot.exists)
      throw new BadRequest(`No records found`, "CommitteeMethod.get");

    return snapshot;
  }

  static async update(data: CommitteeBuilder, id: string) {
    const doc = await this.collection.doc(id).update({
      fromYear: data.fromYear,
      toYear: data.toYear,
      title: data.title,
      description: data.description,
      chairman: data.chairman,
      viceChairman: data.viceChairman,
      members: data.members,
    });
    return doc;
  }

  static async delete(id: string) {
    const doc = await this.collection.doc(id).delete();
    console.log(id);
    return doc;
  }

  static async getAll(pagination: PaginationQuery) {
    const direction = pagination.sortDirection == "asc" ? "asc" : "desc";

    let query = this.collection
      .withConverter(this.converter)
      .orderBy(pagination.sortField, direction);

    if (pagination.last) {
      const last = await this.get(pagination.last as string);
      query = query.startAfter(last);
    }

    const accounts = await query.limit(pagination.limit).get();

    return accounts.docs;
  }

  static async getAllByReading(pagination: PaginationQuery, reading: string) {
    const direction = pagination.sortDirection == "asc" ? "asc" : "desc";

    let query = this.collection
      .withConverter(this.converter)
      .where("reading", "==", reading)
      .orderBy(pagination.sortField, direction);

    if (pagination.last) {
      const last = await this.get(pagination.last as string);
      query = query.startAfter(last);
    }

    const accounts = await query.limit(pagination.limit).get();

    return accounts.docs;
  }

  static async getAllByExtension(pagination: PaginationQuery, type: string) {
    const direction = pagination.sortDirection == "asc" ? "asc" : "desc";

    let query = this.collection
      .withConverter(this.converter)
      .where("type", "==", type)
      .orderBy(pagination.sortField, direction);

    if (pagination.last) {
      const last = await this.get(pagination.last as string);
      query = query.startAfter(last);
    }

    const accounts = await query.limit(pagination.limit).get();

    return accounts.docs;
  }

  static async getById(id: string) {
    const result = await this.collection
      .doc(id)
      .withConverter(this.converter)
      .get();

    return result.data();
  }

  static async getByYear(fromYear: string, toYear: string) {
    const result = await this.collection
      .where("fromYear", "==", fromYear)
      .where("toYear", "==", toYear)
      .withConverter(this.converter)
      .get();

    return result.docs;
  }

  static async getCount() {
    const snapshot = await this.collection.doc("--count--").get();
    return snapshot.data();
  }

  static async getCountSnapshot() {
    const snapshot = await this.collection.doc("--count--").get();

    return snapshot;
  }
}

export default CommitteeMethods;
