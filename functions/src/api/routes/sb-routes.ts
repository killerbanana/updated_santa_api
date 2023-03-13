import SBController from "src/api/sb/controllers/sb-controller";
import { Route } from "src/core/router/route";
//import SBCreateValidator from "../sb/validators/sb-validators";

export = () => {
  const route = new Route();
  route
    .group(() => {
      route.post("/create", SBController.create, "SBController.create");
      //.validator([SBCreateValidator.handle]);
      //.middleware([DefaultAuth.handle]);

      route.post("/update", SBController.update, "SBController.update");
      //.validator([OrdinanceCreateValidator.handle]);

      route.put("/delete", SBController.delete, "SBController.delete");

      route.get("/all", SBController.getAll, "SBController.getAll");

      route.get("/reading", SBController.getByReading, "SBController.getAll");

      route.get(
        "/extension",
        SBController.getByExtension,
        "SBController.getAll"
      );
      //.middleware([DefaultAuth.handle]);

      // route.get(
      //   "/seed",
      //   SBController.seedSB,
      //   "SBController.getAll"
      // );
    })
    .prefix("/SB")
    .namespace("SB/controller");
};
