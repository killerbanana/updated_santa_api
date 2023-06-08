import { Request, Response } from "express";
import PaginationQuery from "src/core/types/pagination-query";
import MinutesService from "../services/minutes-service";
//import PaginationQuery from "src/core/types/pagination-query";
//import Joi from "joi";

class MinutesController {
  static async create(req: Request, res: Response) {
    const { data } = req.body;
    try {
      const result = await MinutesService.create(data);
      return res.status(200).json({
        status: 200,
        message: "Minutes",
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        status: 400,
        message: "Minutes",
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
      const result = await MinutesService.getAll(pagination);
      return res.status(200).json({
        status: 200,
        message: "Minutes",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Error getting Minutes",
        data: error,
      });
    }
  }
 
  
  static async delete(req: Request, res: Response) {
    const { id } = req.query;
    const _id = id as string;
    console.log(id);
    try {
      const result = await MinutesService.delete(_id);
      return res.status(200).json({
        status: 200,
        message: "Deleted Minutes",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Failed to delete Minutes",
        data: error,
      });
    }
  }
    static async update(req: Request, res: Response) {
      const { data } = req.body;
      const { id } = req.query;
      const _id = id as string;
      try {
        const result = await MinutesService.update(data, _id);
        return res.status(200).json({
          status: 200,
          message: "Updated Minutes",
          data: result,
        });
      } catch (error) {
        return res.status(400).json({
          status: 400,
          message: "Failed to update Minutes",
          data: error,
        });
      }
    }
}

export default MinutesController;
