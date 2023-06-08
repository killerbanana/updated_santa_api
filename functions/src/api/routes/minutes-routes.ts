import { Route } from "src/core/router/route";
import MinutesController from "../minutes/controllers/minutes-controller";

export = () => {
  const route = new Route();
  route
    .group(() => {
      route.post(
        "/create",
        MinutesController.create,
        "MinutesController.create"
      );

      route.get(
        "/all",
        MinutesController.getAll,
        "MinutesController.getAll"
      );

      route.put(
        "/delete",
        MinutesController.delete,
        "MinutesController.delete"
      );
      route.post(
        "/update",
        MinutesController.update,
        "MinutesController.update"
      );
    })
    .prefix("/minutes")
    .namespace("minutes/controller");
};
