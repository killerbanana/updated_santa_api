import * as _firestore from "@google-cloud/firestore";
import { firestore } from "firebase-admin";
import Collection from "src/core/enums/collections";
import BadRequest from "src/core/exceptions/bad-request";
import PaginationQuery from "src/core/types/pagination-query";
import { MinutesModel } from "./minutes-interface";
import { MinutesBuilder } from "./minutes-builder";
class MinutesMethods {
  static collection: _firestore.CollectionReference = firestore().collection(
    `${Collection.SANTA_MINUTES}`
  );

  static converter = {
    toFirestore(data: MinutesModel): FirebaseFirestore.DocumentData {
      return data;
    },
    fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot) => {
      const data = snapshot.data();

      return {
        id: snapshot.id,
        ...data,
      } as MinutesModel;
    },
  };

  static async createRef() {
    const doc = this.collection.doc();

    return {
      id: doc.id,
      doc: this.collection.doc(doc.id),
    };
  }

  static async getByusename(username: string) {
    let query = this.collection
      .withConverter(this.converter)
      .where("username", "==", username);
    const accounts = await query.get();
    if (accounts.docs.length > 0) {
      return accounts.docs;
    }
    return [];
  }
  static async update(data: MinutesBuilder, id: string) {
    const doc = await this.collection.doc(id).update({
      filePath: data.filePath,
      date: data.date,
      time: data.time,
      title: data.title,
      agenda: data.agenda,
      venue: data.venue,
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
      throw new BadRequest(`No records found`, "MinutesMethod.get");

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
}

export default MinutesMethods;
