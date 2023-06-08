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
        "AuthenticationController.getAll"
      );

      route.get(
        "/dashboard",
        AuthenticationController.getAllDashboard,
        "AuthenticationController.getAllDashboard"
      );
      route.put(
        "/delete",
        AuthenticationController.delete,
        "AuthenticationController.delete"
      );
      route.post(
        "/update",
        AuthenticationController.update,
        "appropriationController.update"
      );
    })
    .prefix("/authentication")
    .namespace("authentication/controller");
};
