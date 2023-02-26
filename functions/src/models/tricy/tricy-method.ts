import * as _firestore from "@google-cloud/firestore";
import { firestore } from "firebase-admin";
import Collection from "src/core/enums/collections";
import BadRequest from "src/core/exceptions/bad-request";
import PaginationQuery from "src/core/types/pagination-query";
import { TricyBuilder } from "./tricy-builder";
import { TricyModel } from "./tricy-interface";
class TricyMethods {
  static collection: _firestore.CollectionReference = firestore().collection(
    `${Collection.SANTA_TRICY}`
  );

  static converter = {
    toFirestore(data: TricyModel): FirebaseFirestore.DocumentData {
      return data;
    },
    fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot) => {
      const data = snapshot.data();

      return {
        id: snapshot.id,
        ...data,
      } as TricyModel;
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
      throw new BadRequest(`No records found`, "TricyMethod.get");

    return snapshot;
  }

  static async update(data: TricyBuilder, id: string) {
    const doc = await this.collection.doc(id).update({
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

  static async getCount() {
    const snapshot = await this.collection.doc("--count--").get();

    return snapshot.data();
  }
}

export default TricyMethods;
