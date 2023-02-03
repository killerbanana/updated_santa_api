import AppropriationController from "src/api/appropriation/controllers/appropriation-controller";
import { Route } from "src/core/router/route";
import AppropriationCreateValidator from "../appropriation/validators/appropriation-validator";

export = () => {
  const route = new Route();
  route
    .group(() => {
      route
        .post(
          "/create",
          AppropriationController.create,
          "appropriationController.create"
        )
        .validator([AppropriationCreateValidator.handle]);
      //.middleware([DefaultAuth.handle]);

      route.post(
        "/update",
        AppropriationController.update,
        "appropriationController.update"
      );
      //.validator([appropriationCreateValidator.handle]);

      route.put(
        "/delete",
        AppropriationController.delete,
        "appropriationController.delete"
      );

      route.get(
        "/all",
        AppropriationController.getAll,
        "appropriationController.getAll"
      );
      //.middleware([DefaultAuth.handle]);

      // route.get(
      //   "/seed",
      //   AppropriationController.seedappropriation,
      //   "appropriationController.getAll"
      // );
    })
    .prefix("/appropriation")
    .namespace("appropriation/controller");
};
