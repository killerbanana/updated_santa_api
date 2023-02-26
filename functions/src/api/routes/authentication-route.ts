import AuthenticationController from "src/api/authentication/controllers/authentication-controller";
import { Route } from "src/core/router/route";

export = () => {
  const route = new Route();
  route
    .group(() => {
      route.post(
        "/create",
        AuthenticationController.create,
        "AuthenticationController.create"
      );

      route.post(
        "/login",
        AuthenticationController.login,
        "AuthenticationController.login"
      );

      route.get(
        "/all",
        AuthenticationController.getAll,
        "OrdinanceController.getAll"
      );

      route.get(
        "/dashboard",
        AuthenticationController.getAllDashboard,
        "OrdinanceController.getAllDashboard"
      );
      //.middleware([DefaultAuth.handle]);

      //   route.post(
      //     "/update",
      //     AuthenticationController.update,
      //     "AuthenticationController.update"
      //   );
      //   //.validator([OrdinanceCreateValidator.handle]);

      //   route.put(
      //     "/delete",
      //     AuthenticationController.delete,
      //     "AuthenticationController.delete"
      //   );

      //   route.get(
      //     "/all",
      //     AuthenticationController.getAll,
      //     "AuthenticationController.getAll"
      //   );

      //.middleware([DefaultAuth.handle]);

      // route.get(
      //   "/seed",
      //   ResolutionController.seedResolution,
      //   "ResolutionController.getAll"
      // );
    })
    .prefix("/authentication")
    .namespace("authentication/controller");
};
