import { Request, Response } from "express";
import SBService from "../services/sb-services";
import PaginationQuery from "src/core/types/pagination-query";
//import Joi from "joi";

class SBController {
  static async create(req: Request, res: Response) {
    const { data } = req.body;
    try {
      const result = await SBService.create(data);
      return res.status(200).json({
        status: 200,
        message: "SB",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "SB",
        data: error,
      });
    }
  }

  static async getAll(req: Request, res: Response) {
    const { limit, sort, last } = req.query;
    const _sort = (sort as string).split("|");

    const pagination: PaginationQuery = {
      limit: +(limit as string),
      sortField: _sort[0],
      sortDirection: _sort[1],
    };

    if (last != "") {
      pagination.last = last as string;
    }

    try {
      const result = await SBService.getAll(pagination);
      return res.status(200).json({
        status: 200,
        message: "SBs",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Error getting SB",
        data: error,
      });
    }
  }

  static async update(req: Request, res: Response) {
    const { data } = req.body;
    const { id } = req.query;
    const _id = id as string;
    try {
      const result = await SBService.update(data, _id);
      return res.status(200).json({
        status: 200,
        message: "Updated SB",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Failed to update SB",
        data: error,
      });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.query;
    const _id = id as string;
    console.log(id);
    try {
      const result = await SBService.delete(_id);
      return res.status(200).json({
        status: 200,
        message: "Deleted SB",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Failed to delete SB",
        data: error,
      });
    }
  }

  static async getByReading(req: Request, res: Response) {
    const { limit, sort, last, reading } = req.query;
    const _sort = (sort as string).split("|");

    const pagination: PaginationQuery = {
      limit: +(limit as string),
      sortField: _sort[0],
      sortDirection: _sort[1],
    };

    if (last != "") {
      pagination.last = last as string;
    }

    try {
      const result = await SBService.getByReading(
        pagination,
        reading as string
      );

      return res.status(200).json({
        status: 200,
        message: "SBs",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Error getting SB",
        data: error,
      });
    }
  }

  static async getByExtension(req: Request, res: Response) {
    const { limit, sort, last, extension } = req.query;
    const _sort = (sort as string).split("|");

    const pagination: PaginationQuery = {
      limit: +(limit as string),
      sortField: _sort[0],
      sortDirection: _sort[1],
    };

    if (last != "") {
      pagination.last = last as string;
    }

    try {
      const result = await SBService.getByExtension(
        pagination,
        extension as string
      );

      return res.status(200).json({
        status: 200,
        message: "SBs",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Error getting SB",
        data: error,
      });
    }
  }

  // static async seedSB(req: Request, res: Response) {
  //   var SB = [];
  //   for (const ordi of SBs) {
  //     const cashloanRef = await SBMethods.createRef();
  //     const SBData = new SBBuilder({
  //       id: cashloanRef.doc.id,
  //       SBNumber: ordi.SBNumber.toString(),
  //       series: ordi.Series.toString(),
  //       date: ordi.Date,
  //       title: ordi.Title,
  //       author: ordi.Author,
  //       filePath: "",
  //       time: ordi.Time,
  //       type: ".pdf",
  //       size: ordi.Size,
  //       tag: ordi.Tag,
  //       reading: ordi.Reading,
  //       created: ordi.Created,
  //       updated: ordi.Created,
  //     });
  //     SB.push(SBData);
  //   }
  //   const result = await SBService.seed(SB);
  //   return res.status(200).json({
  //     status: 200,
  //     message: "SB Seeded",
  //     data: result,
  //   });
  // }
}

export default SBController;
