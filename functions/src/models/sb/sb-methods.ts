import * as _firestore from "@google-cloud/firestore";
import { firestore } from "firebase-admin";
import Collection from "src/core/enums/collections";
import BadRequest from "src/core/exceptions/bad-request";
import PaginationQuery from "src/core/types/pagination-query";
import { SBBuilder } from "./sb-builder";
import { SBModel } from "./sb-interface";
class SBMethods {
  static collection: _firestore.CollectionReference = firestore().collection(
    `${Collection.SANTA_SB}`
  );

  static converter = {
    toFirestore(data: SBModel): FirebaseFirestore.DocumentData {
      return data;
    },
    fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot) => {
      const data = snapshot.data();

      return {
        id: snapshot.id,
        ...data,
      } as SBModel;
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
      throw new BadRequest(`No records found`, "SBMethod.get");

    return snapshot;
  }

  static async update(data: SBBuilder, id: string) {
    const doc = await this.collection.doc(id).update({
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

  static async getCount() {
    const snapshot = await this.collection.doc("--count--").get();
    return snapshot.data();
  }

  static async getCountSnapshot() {
    const snapshot = await this.collection.doc("--count--").get();

    return snapshot;
  }
}

export default SBMethods;
