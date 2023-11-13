import facebook from "../icons/facebook.png";
import instagram from "../icons/instagram.png";

function Footer() {
  return (
    <>
      <footer className="bg-main-color w-full ">
        <div className="sectionLayout flex justify-between gap-20">
          <div className="w-1/2 my-auto">
            <p className="h1T text-white mb-5">
              TACK FÖR ATT DU ANVÄNDER VÅR HEMSIDA
            </p>
            <p className="text-white">
              Brottsplatsen.info är en oberoende plattform och har inget
              officiellt samarbete med eller representation av den svenska
              polisen. Vår tjänst syftar till att endast presentera information
              som är offentligt tillgänglig via polisens kanaler.
            </p>
          </div>
          <div className="w-1/3 my-auto">
            <p className="text-white">
              Vi har inga e-mail support i dagsläget. Vill du däremot komma i
              kontakt med oss kan du skriva till oss på våra sociala medier.
            </p>
            <div className="mt-10">
              <ul className="flex gap-5">
                <li>
                  <img src={facebook} alt="" className="w-10" />
                </li>

                <li>
                  <img src={instagram} alt="" className="w-10" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
