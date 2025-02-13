interface InfoSectionProps {
  title: string;
  description: React.ReactNode;
  image: string; // Solo se permite string (ruta de la imagen)
  imageAlt: string;
  reverse: boolean;
}

const slugFromTitle = (title: string) => {
  return title.toLowerCase().replaceAll(" ", "-");
};

export const InfoCard = ({
  description,
  image,
  imageAlt,
  reverse,
  title,
}: InfoSectionProps) => {
  return (
    <div
      id={slugFromTitle(title)}
      className={`
      w-full px-5 md:px-20
      ${reverse && "bg-zinc-100"}
    flex flex-col-reverse justify-evenly items-center gap-10 py-20
    lg:gap-24
    ${reverse ? "xl:flex-row-reverse" : "xl:flex-row"}
    `}
    >
      <div className="basis-1/2 flex flex-col gap-5 scroll-pt-10 snap-y">
        <h1 className="font-bold text-2xl md:text-3xl text-bluePrimary">
          {title}
        </h1>
        <div className="flex flex-col gap-5 text-customGray text-sm sm:text-base">
          {description}
        </div>
      </div>
      <div className="basis-1/2">
        <img
          src={image} // Usa la etiqueta <img> estándar
          alt={imageAlt}
          width={607} // Ancho de la imagen en píxeles
          height={404} // Alto de la imagen en píxeles
          className="shadow-xl"
        />
      </div>
    </div>
  );
};
