import * as _firestore from "@google-cloud/firestore";
import { firestore } from "firebase-admin";
import Collection from "src/core/enums/collections";
import BadRequest from "src/core/exceptions/bad-request";
import PaginationQuery from "src/core/types/pagination-query";
import { AppropriationBuilder } from "./appropriation-builder";
import { AppropriationModel } from "./appropriation-interface";
class AppropriationMethods {
  static collection: _firestore.CollectionReference = firestore().collection(
    `${Collection.SANTA_APPROPRIATION}`
  );

  static converter = {
    toFirestore(data: AppropriationModel): FirebaseFirestore.DocumentData {
      return data;
    },
    fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot) => {
      const data = snapshot.data();

      return {
        id: snapshot.id,
        ...data,
      } as AppropriationModel;
    },
  };

  static async createRef() {
    const doc = this.collection.doc();

    return {
      id: doc.id,
      doc: this.collection.doc(doc.id),
    };
  }

  static async update(data: AppropriationBuilder, id: string) {
    const doc = await this.collection.doc(id).update({
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
    return doc;
  }

  static async delete(id: string) {
    const doc = await this.collection.doc(id).delete();
    console.log(id);
    return doc;
  }

  static async get(docId: string) {
    const snapshot = await this.collection.doc(docId).get();

    if (!snapshot.exists)
      throw new BadRequest(`No records found`, "appropriationMethod.get");

    return snapshot;
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

  static async getCount() {
    const snapshot = await this.collection.doc("--count--").get();

    return snapshot.data();
  }

  static async getCountSnapshot() {
    const snapshot = await this.collection.doc("--count--").get();

    return snapshot;
  }
}

export default AppropriationMethods;
