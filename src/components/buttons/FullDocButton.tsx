import { appConfig } from "../../constants";

const { branding } = appConfig;

export const FullDocButton = () => {
  return (
    <a
      href={branding.links.privacyPolicies}
      target="_blank"
      rel="noreferrer"
      className="border-2 border-white text-white py-2 px-4 font-bold bg-blueSecondary max-w-md shadow-md mx-auto"
    >
      Accede al documento completo en PDF
    </a>
  );
};
