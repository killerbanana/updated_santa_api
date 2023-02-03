import { Request, Response } from "express";
import ResolutionService from "../services/reso-service";
import PaginationQuery from "src/core/types/pagination-query";
//import Joi from "joi";

class ResolutionController {
  static async create(req: Request, res: Response) {
    const { data } = req.body;
    try {
      const result = await ResolutionService.create(data);
      return res.status(200).json({
        status: 200,
        message: "Resolution",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Resolution",
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
      const result = await ResolutionService.getAll(pagination);
      return res.status(200).json({
        status: 200,
        message: "Resolutions",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Error getting Resolution",
        data: error,
      });
    }
  }

  static async update(req: Request, res: Response) {
    const { data } = req.body;
    const { id } = req.query;
    const _id = id as string;
    try {
      const result = await ResolutionService.update(data, _id);
      return res.status(200).json({
        status: 200,
        message: "Updated resolution",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Failed to update resolution",
        data: error,
      });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.query;
    const _id = id as string;
    console.log(id);
    try {
      const result = await ResolutionService.delete(_id);
      return res.status(200).json({
        status: 200,
        message: "Deleted resolution",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Failed to delete resolution",
        data: error,
      });
    }
  }

  // static async seedResolution(req: Request, res: Response) {
  //   var Resolution = [];
  //   for (const ordi of Resolutions) {
  //     const cashloanRef = await ResolutionMethods.createRef();
  //     const ResolutionData = new ResolutionBuilder({
  //       id: cashloanRef.doc.id,
  //       resolutionNumber: ordi.ResolutionNumber.toString(),
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
  //     Resolution.push(ResolutionData);
  //   }
  //   const result = await ResolutionService.seed(Resolution);
  //   return res.status(200).json({
  //     status: 200,
  //     message: "Resolution Seeded",
  //     data: result,
  //   });
  // }
}

export default ResolutionController;
