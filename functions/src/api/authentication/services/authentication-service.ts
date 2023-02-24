import { firestore } from "firebase-admin";
import * as bcrypt from "bcryptjs";
import { AuthenticationBuilder } from "src/models/authentication/authentication-builder";
import AuthenticationMethods from "src/models/authentication/authentication-method";
import BadRequest from "src/core/exceptions/bad-request";

class AuthenticationService {
  static async create(data: AuthenticationBuilder) {
    const batch = firestore().batch();
    console.log(data.username);
    const getUsername = await AuthenticationMethods.getByusename(data.username);
    if (getUsername.length > 0) {
      throw new BadRequest(
        `[USERNAME] Username already taken=${data.username}.`,
        "AuthenticationMethods.get"
      );
    }
    // const validPass = await bcrypt.compare(
    //   data.password,
    //   getUsername[0].data().password
    // );

    const authenticationRef = await AuthenticationMethods.createRef();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const authenticationData = new AuthenticationBuilder({
      id: authenticationRef.doc.id,
      username: data.username,
      password: hashedPassword,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      suffix: data.suffix ?? "",
      birthday: data.birthday,
      gender: data.gender,
      address: data.address,
      contactNumber: data.contactNumber,
    });
    batch.set(authenticationRef.doc, Object.assign({}, authenticationData));
    await batch.commit();

    return { authenticationData };
  }

  //   static async update(data: OrdinanceBuilder, id: string) {
  //     const ordinanceRef = await OrdinanceMethods.update(data, id);
  //     return { ordinanceRef };
  //   }

  //   static async delete(id: string) {
  //     const ordinanceRef = await OrdinanceMethods.delete(id);
  //     return { ordinanceRef };
  //   }

  //   static async getAll(pagination: PaginationQuery) {
  //     const docs = await OrdinanceMethods.getAll(pagination);

  //     const ordinance: Array<OrdinanceModel> = [];

  //     for (const data of docs) {
  //       const ordinanceData = data.data();
  //       ordinance.push(ordinanceData);
  //     }

  //     let last;

  //     if (ordinance.length > 0) {
  //       last = ordinance[ordinance.length - 1].id as string;
  //     }

  //     const getCount = await OrdinanceMethods.getCount();

  //     return {
  //       ordinance,
  //       last: last,
  //       getCount,
  //     };
  //   }

  //   static async getByReading(pagination: PaginationQuery, reading: string) {
  //     const docs = await OrdinanceMethods.getAllByReading(pagination, reading);

  //     const ordinance: Array<OrdinanceModel> = [];

  //     for (const data of docs) {
  //       const ordinanceData = data.data();
  //       ordinance.push(ordinanceData);
  //     }

  //     let last;

  //     if (ordinance.length > 0) {
  //       last = ordinance[ordinance.length - 1].id as string;
  //     }

  //     const getCount = await OrdinanceMethods.getCount();

  //     return {
  //       ordinance,
  //       last: last,
  //       getCount,
  //     };
  //   }

  //   static async getByExtension(pagination: PaginationQuery, type: string) {
  //     const docs = await OrdinanceMethods.getAllByExtension(pagination, type);

  //     const ordinance: Array<OrdinanceModel> = [];

  //     for (const data of docs) {
  //       const ordinanceData = data.data();
  //       ordinance.push(ordinanceData);
  //     }

  //     let last;

  //     if (ordinance.length > 0) {
  //       last = ordinance[ordinance.length - 1].id as string;
  //     }

  //     const getCount = await OrdinanceMethods.getCount();

  //     return {
  //       ordinance,
  //       last: last,
  //       getCount,
  //     };
  //   }

  //   static async seed(data: Array<OrdinanceBuilder>) {
  //     data.map(async (data: OrdinanceBuilder) => {
  //       const batch = firestore().batch();
  //       const cashloanRef = await OrdinanceMethods.createRef();
  //       batch.set(cashloanRef.doc, Object.assign({}, data));
  //       console.log(cashloanRef.doc.id);
  //       await batch.commit();
  //     });
  //   }
}

export default AuthenticationService;
