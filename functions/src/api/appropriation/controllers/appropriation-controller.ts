import { Request, Response } from "express";
import AppropriationService from "../services/appropriation-service";
import PaginationQuery from "src/core/types/pagination-query";
//import Joi from "joi";

class AppropriationController {
  static async create(req: Request, res: Response) {
    const { data } = req.body;
    try {
      const result = await AppropriationService.create(data);
      return res.status(200).json({
        status: 200,
        message: "appropriations",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "appropriations",
        data: error,
      });
    }
  }

  static async update(req: Request, res: Response) {
    const { data } = req.body;
    const { id } = req.query;
    const _id = id as string;
    try {
      const result = await AppropriationService.update(data, _id);
      return res.status(200).json({
        status: 200,
        message: "Updated appropriation",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Failed to update appropriations",
        data: error,
      });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.query;
    const _id = id as string;
    console.log(id);
    try {
      const result = await AppropriationService.delete(_id);
      return res.status(200).json({
        status: 200,
        message: "Deleted appropriation",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Failed to delete appropriation",
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
      const result = await AppropriationService.getAll(pagination);
      return res.status(200).json({
        status: 200,
        message: "appropriations",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Error getting appropriation",
        data: error,
      });
    }
  }

  // static async seedappropriation(req: Request, res: Response) {
  //   var appropriation = [];
  //   for (const ordi of APPROPRIATIONS) {
  //     const cashloanRef = await AppropriationMethods.createRef();
  //     const appropriationData = new AppropriationBuilder({
  //       id: cashloanRef.doc.id,
  //       appropriationNumber: ordi.AppropriationNumber.toString(),
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
  //     appropriation.push(appropriationData);
  //   }
  //   const result = await AppropriationService.seed(appropriation);
  //   return res.status(200).json({
  //     status: 200,
  //     message: "appropriations Seeded",
  //     data: result,
  //   });
  // }
}

export default AppropriationController;
