import uspRealTime from "../icons/uspRealTime.svg";
import uspCrimeType from "../icons/uspCrimeType.svg";
import uspSumData from "../icons/uspSumData.svg";
import uspOpenData from "../icons/uspOpenData.svg";

export default function UspSection() {
  const features = [
    {
      name: "Realtidsinformation",
      description:
        "Få de senaste brottsrapporterna i realtid och håll dig uppdaterad om vad som händer i din omgivning.",
      icon: uspRealTime,
    },
    {
      name: "Brottshändelser och information",
      description:
        "Utforska de olika brottskategorierna, deras egenskaper och detaljer för en djupgående förståelse av händelserna.",
      icon: uspCrimeType,
    },
    {
      name: "Sammanfattningar och översikter",
      description:
        "Få snabbinsikter med våra sammanfattningar och översikter, inklusive grafer och diagram som visar de mest relevanta brottsstatistikerna.",
      icon: uspSumData,
    },
    {
      name: "Öppen data",
      description:
        "Vi strävar efter full öppenhet genom att tillhandahålla datakällor och metoder för att säkerställa att du har tillgång till pålitlig och transparent information om brottsstatistik.",
      icon: uspOpenData,
    },
  ];
  return (
    <div className="sectionLayout">
      <div className="mx-auto max-w-7xl px-2">
        <div className="mx-auto elementLayout1 lg:text-center">
          <h2 className="highlight">Brottskollen.info</h2>
          <p className="h2T mt-2 font-bold tracking-tight text-gray-900 sm:text-4xl">
            Information om brottshändelser
          </p>
          <p className="mt-6 text-gray-600">
            Vi övervakar Polisens data i realtid, och uppdaterar dig regelbundet
            med de senaste rapporterna om deras verksamhet. Vårt mål är att
            hålla dig alltid informerad och uppdaterad om vad som händer hos
            Polisen
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-7xl">
          <dl className="grid xs:px-5 max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center">
                    <img src={feature.icon} alt="" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
