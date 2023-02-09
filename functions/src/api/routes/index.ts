import ordinanceRoute from "./ordinance-routes";
import resolutionRoute from "./reso-routes";
import aprropriationRoute from "./appropriation-routes";
import tricyRoute from "./tricy-routes";

export = () => {
  ordinanceRoute();
  resolutionRoute();
  aprropriationRoute();
  tricyRoute();
};
