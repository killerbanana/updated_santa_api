import CommitteeController from "src/api/committee/controllers/committe-controllers";
import { Route } from "src/core/router/route";
//import CommitteeCreateValidator from "../Committee/validators/Committee-validators";

export = () => {
  const route = new Route();
  route
    .group(() => {
      route.post(
        "/create",
        CommitteeController.create,
        "CommitteeController.create"
      );
      //.validator([CommitteeCreateValidator.handle]);
      //.middleware([DefaultAuth.handle]);

      route.post(
        "/update",
        CommitteeController.update,
        "CommitteeController.update"
      );
      //.validator([OrdinanceCreateValidator.handle]);

      route.put(
        "/delete",
        CommitteeController.delete,
        "CommitteeController.delete"
      );

      route.get(
        "/all",
        CommitteeController.getAll,
        "CommitteeController.getAll"
      );

      route.get(
        "/reading",
        CommitteeController.getByReading,
        "CommitteeController.getAll"
      );

      route.get(
        "/extension",
        CommitteeController.getByExtension,
        "CommitteeController.getAll"
      );
      route.get(
        "/id",
        CommitteeController.getById,
        "CommitteeController.getAll"
      );

      route.get(
        "/year",
        CommitteeController.getByYear,
        "CommitteeController.getAll"
      );
      //.middleware([DefaultAuth.handle]);

      // route.get(
      //   "/seed",
      //   CommitteeController.seedCommittee,
      //   "CommitteeController.getAll"
      // );
    })
    .prefix("/committee")
    .namespace("committee/controller");
};
