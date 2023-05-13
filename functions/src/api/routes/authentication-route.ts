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
    })
    .prefix("/authentication")
    .namespace("authentication/controller");
};
