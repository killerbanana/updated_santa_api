import { Request, Response } from "express";
import OrdinanceService from "../services/ordinance-service";
import PaginationQuery from "src/core/types/pagination-query";
//import Joi from "joi";

class OrdinanceController {
  static async create(req: Request, res: Response) {
    const { data } = req.body;
    try {
      const result = await OrdinanceService.create(data);
      return res.status(200).json({
        status: 200,
        message: "Ordinances",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Ordinances",
        data: error,
      });
    }
  }

  static async update(req: Request, res: Response) {
    const { data } = req.body;
    const { id } = req.query;
    const _id = id as string;
    try {
      const result = await OrdinanceService.update(data, _id);
      return res.status(200).json({
        status: 200,
        message: "Updated ordinance",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Failed to update ordinances",
        data: error,
      });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.query;
    const _id = id as string;
    console.log(id);
    try {
      const result = await OrdinanceService.delete(_id);
      return res.status(200).json({
        status: 200,
        message: "Deleted ordinance",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Failed to delete ordinance",
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
      const result = await OrdinanceService.getAll(pagination);
      return res.status(200).json({
        status: 200,
        message: "Ordinances",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Error getting ordinance",
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
      const result = await OrdinanceService.getByReading(
        pagination,
        reading as string
      );

      return res.status(200).json({
        status: 200,
        message: "Ordinances",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Error getting ordinance",
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
      const result = await OrdinanceService.getByExtension(
        pagination,
        extension as string
      );

      return res.status(200).json({
        status: 200,
        message: "Ordinances",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Error getting ordinance",
        data: error,
      });
    }
  }

  // static async seedOrdinance(req: Request, res: Response) {
  //   var ordinance = [];
  //   for (const ordi of ORDINANCES) {
  //     const cashloanRef = await OrdinanceMethods.createRef();
  //     const ordinanceData = new OrdinanceBuilder({
  //       id: cashloanRef.doc.id,
  //       ordinanceNumber: ordi.OrdinanceNumber.toString(),
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
  //     ordinance.push(ordinanceData);
  //   }
  //   const result = await OrdinanceService.seed(ordinance);
  //   return res.status(200).json({
  //     status: 200,
  //     message: "Ordinances Seeded",
  //     data: result,
  //   });
  // }
}

export default OrdinanceController;
