import TricyController from "src/api/tricy/controllers/tricy-controller";
import { Route } from "src/core/router/route";
//import TricyCreateValidator from "../tricy/validators/tricy-validator";

export = () => {
  const route = new Route();
  route
    .group(() => {
      route.post(
        "/create",
        TricyController.create,
        "ResolutionController.create"
      );
      //.validator([TricyCreateValidator.handle]);
      //.middleware([DefaultAuth.handle]);

      route.post(
        "/update",
        TricyController.update,
        "ResolutionController.update"
      );
      //.validator([TricyCreateValidator.handle]);

      route.put(
        "/delete",
        TricyController.delete,
        "ResolutionController.delete"
      );

      route.get("/all", TricyController.getAll, "ResolutionController.getAll");

      //.middleware([DefaultAuth.handle]);

      // route.get(
      //   "/seed",
      //   ResolutionController.seedResolution,
      //   "ResolutionController.getAll"
      // );
    })
    .prefix("/tricy")
    .namespace("tricy/controller");
};
