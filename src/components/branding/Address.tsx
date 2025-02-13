import { MdLocationOn } from "react-icons/md";
import { appConfig } from "../../constants";

const { address } = appConfig.branding.contact;

export const Address = () => {
  return (
    <a
      href="https://goo.gl/maps/z7MKDYoVNxZtBYYr7"
      target="_top"
      className="flex items-center gap-2"
    >
      <MdLocationOn className="text-blueSecondary" />
      <p className="text-customGray text-sm">{`Puerto Berrío. ${address}`}</p>
    </a>
  );
};

export const AddressWhite = () => {
  return (
    <a
      href="https://goo.gl/maps/z7MKDYoVNxZtBYYr7"
      target="_top"
      className="flex items-center gap-2"
    >
      <MdLocationOn className="text-blueSecondary" />
      <p className="text-white text-sm">{`Puerto Berrío. ${address}`}</p>
    </a>
  );
};
