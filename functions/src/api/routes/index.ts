import ordinanceRoute from "./ordinance-routes";
import resolutionRoute from "./reso-routes";
import aprropriationRoute from "./appropriation-routes";

export = () => {
  ordinanceRoute();
  resolutionRoute();
  aprropriationRoute();
};
