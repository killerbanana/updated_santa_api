import { Request, Response } from "express";
import TricyService from "../services/tricy-service";
import PaginationQuery from "src/core/types/pagination-query";
//import Joi from "joi";

class TricyController {
  static async create(req: Request, res: Response) {
    const { data } = req.body;
    try {
      const result = await TricyService.create(data);
      return res.status(200).json({
        status: 200,
        message: "Tricy",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Tricy",
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
      const result = await TricyService.getAll(pagination);
      return res.status(200).json({
        status: 200,
        message: "Tricys",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Error getting Tricy",
        data: error,
      });
    }
  }

  static async update(req: Request, res: Response) {
    const { data } = req.body;
    const { id } = req.query;
    const _id = id as string;
    try {
      const result = await TricyService.update(data, _id);
      return res.status(200).json({
        status: 200,
        message: "Updated Tricy",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Failed to update Tricy",
        data: error,
      });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.query;
    const _id = id as string;
    console.log(id);
    try {
      const result = await TricyService.delete(_id);
      return res.status(200).json({
        status: 200,
        message: "Deleted Tricy",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Failed to delete Tricy",
        data: error,
      });
    }
  }

  // static async seedTricy(req: Request, res: Response) {
  //   var Tricy = [];
  //   for (const ordi of Tricys) {
  //     const cashloanRef = await TricyMethods.createRef();
  //     const TricyData = new TricyBuilder({
  //       id: cashloanRef.doc.id,
  //       TricyNumber: ordi.TricyNumber.toString(),
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
  //     Tricy.push(TricyData);
  //   }
  //   const result = await TricyService.seed(Tricy);
  //   return res.status(200).json({
  //     status: 200,
  //     message: "Tricy Seeded",
  //     data: result,
  //   });
  // }
}

export default TricyController;
