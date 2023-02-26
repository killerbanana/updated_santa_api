import ResolutionController from "src/api/reso/controllers/reso-controller";
import { Route } from "src/core/router/route";
import ResolutionCreateValidator from "../reso/validators/reso-validator";

export = () => {
  const route = new Route();
  route
    .group(() => {
      route
        .post(
          "/create",
          ResolutionController.create,
          "ResolutionController.create"
        )
        .validator([ResolutionCreateValidator.handle]);
      //.middleware([DefaultAuth.handle]);

      route.post(
        "/update",
        ResolutionController.update,
        "ResolutionController.update"
      );
      //.validator([OrdinanceCreateValidator.handle]);

      route.put(
        "/delete",
        ResolutionController.delete,
        "ResolutionController.delete"
      );

      route.get(
        "/all",
        ResolutionController.getAll,
        "ResolutionController.getAll"
      );

      route.get(
        "/reading",
        ResolutionController.getByReading,
        "ResolutionController.getAll"
      );

      route.get(
        "/extension",
        ResolutionController.getByExtension,
        "ResolutionController.getAll"
      );
      //.middleware([DefaultAuth.handle]);

      // route.get(
      //   "/seed",
      //   ResolutionController.seedResolution,
      //   "ResolutionController.getAll"
      // );
    })
    .prefix("/resolution")
    .namespace("resolution/controller");
};
