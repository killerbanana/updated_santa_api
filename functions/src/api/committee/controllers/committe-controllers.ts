import { Request, Response } from "express";
import CommitteeService from "../services/committee-services";
import PaginationQuery from "src/core/types/pagination-query";
//import Joi from "joi";

class CommitteeController {
  static async create(req: Request, res: Response) {
    const { data } = req.body;
    try {
      const result = await CommitteeService.create(data);
      return res.status(200).json({
        status: 200,
        message: "Committee",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Committee",
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
      const result = await CommitteeService.getAll(pagination);
      return res.status(200).json({
        status: 200,
        message: "Committees",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Error getting Committee",
        data: error,
      });
    }
  }

  static async update(req: Request, res: Response) {
    const { data } = req.body;
    const { id } = req.query;
    const _id = id as string;
    try {
      const result = await CommitteeService.update(data, _id);
      return res.status(200).json({
        status: 200,
        message: "Updated Committee",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Failed to update Committee",
        data: error,
      });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.query;
    const _id = id as string;
    console.log(id);
    try {
      const result = await CommitteeService.delete(_id);
      return res.status(200).json({
        status: 200,
        message: "Deleted Committee",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Failed to delete Committee",
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
      const result = await CommitteeService.getByReading(
        pagination,
        reading as string
      );

      return res.status(200).json({
        status: 200,
        message: "Committees",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Error getting Committee",
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
      const result = await CommitteeService.getByExtension(
        pagination,
        extension as string
      );

      return res.status(200).json({
        status: 200,
        message: "Committees",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Error getting Committee",
        data: error,
      });
    }
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.query;
    try {
      const result = await CommitteeService.getById(id as string);

      return res.status(200).json({
        status: 200,
        message: "Committees",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Error getting Committee",
        data: error,
      });
    }
  }

  static async getByYear(req: Request, res: Response) {
    const { fromYear, toYear } = req.query;
    try {
      const result = await CommitteeService.getByYear(
        fromYear as string,
        toYear as string
      );

      return res.status(200).json({
        status: 200,
        message: "Committees",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Error getting Committee",
        data: error,
      });
    }
  }

  // static async seedCommittee(req: Request, res: Response) {
  //   var Committee = [];
  //   for (const ordi of Committees) {
  //     const cashloanRef = await CommitteeMethods.createRef();
  //     const CommitteeData = new CommitteeBuilder({
  //       id: cashloanRef.doc.id,
  //       CommitteeNumber: ordi.CommitteeNumber.toString(),
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
  //     Committee.push(CommitteeData);
  //   }
  //   const result = await CommitteeService.seed(Committee);
  //   return res.status(200).json({
  //     status: 200,
  //     message: "Committee Seeded",
  //     data: result,
  //   });
  // }
}

export default CommitteeController;
