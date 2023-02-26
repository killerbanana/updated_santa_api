import { firestore } from "firebase-admin";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { AuthenticationBuilder } from "src/models/authentication/authentication-builder";
import AuthenticationMethods from "src/models/authentication/authentication-method";
import BadRequest from "src/core/exceptions/bad-request";
import PaginationQuery from "src/core/types/pagination-query";
import { AuthenticationModel } from "src/models/authentication/authentication-interface";
import { CountModel } from "src/models/authentication/count-interface";
import OrdinanceMethods from "src/models/ordinance/ordinance-method";
import ResolutionMethods from "src/models/reso/reso-method";
import TricyMethods from "src/models/tricy/tricy-method";
import AppropriationMethods from "src/models/appropriation/appropriation-method";

class AuthenticationService {
  static async create(data: AuthenticationBuilder) {
    const batch = firestore().batch();

    const getUsername = await AuthenticationMethods.getByusename(data.username);
    if (getUsername.length > 0) {
      throw new BadRequest(
        `Username already taken=${data.username}.`,
        "AuthenticationMethods.get"
      );
    }

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

  static async login(data: AuthenticationBuilder) {
    const getUsername = await AuthenticationMethods.getByusename(data.username);

    if (getUsername.length == 0) {
      throw new BadRequest(
        `Username or password invalid=${data.username}.`,
        "AuthenticationMethods.get"
      );
    }

    const validPass = await bcrypt.compare(
      data.password,
      getUsername[0].data().password
    );

    if (!validPass)
      throw new BadRequest(
        `Username or password invalid=${data.username}.`,
        "AuthenticationMethods.get"
      );

    const privateKey = Buffer.from(
      process.env.ACCESS_TOKEN_SECRET as String,
      "base64"
    ).toString("ascii");

    const payload = { ...data };
    const token = jwt.sign(payload, privateKey, {
      expiresIn: process.env.JWT_EXP,
    });

    return { success: token };
  }

  static async getAll(pagination: PaginationQuery) {
    const docs = await AuthenticationMethods.getAll(pagination);

    const accounts: Array<AuthenticationModel> = [];

    for (const data of docs) {
      const accountsData = data.data();
      accounts.push(accountsData);
    }

    let last;

    if (accounts.length > 0) {
      last = accounts[accounts.length - 1].id as string;
    }

    const getCount = await AuthenticationMethods.getCount();

    return {
      accounts,
      last: last,
      getCount,
    };
  }

  static async getAllDashboard() {
    var authCount = await AuthenticationMethods.getCount();
    authCount = authCount as CountModel;

    var ordinanceCount = await OrdinanceMethods.getCount();
    ordinanceCount = ordinanceCount as CountModel;

    var resoCount = await ResolutionMethods.getCount();
    resoCount = resoCount as CountModel;

    var tricyCount = await TricyMethods.getCount();
    tricyCount = tricyCount as CountModel;

    var tricyCount = await TricyMethods.getCount();
    tricyCount = tricyCount as CountModel;

    var appropriationCount = await AppropriationMethods.getCount();
    appropriationCount = appropriationCount as CountModel;

    return {
      users: authCount.count,
      ordinanceCount: ordinanceCount.count,
      resoCount: resoCount.count,
      tricyCount: tricyCount.count,
      appropriationCount: appropriationCount.count,
    };
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
