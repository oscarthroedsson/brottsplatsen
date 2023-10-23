import arrow from "../icons/arrow.png";

export default function ListBox() {
  //functions

  return (
    <div className="centerElements flex-col ">
      <div className=" p-3 infoContainer ">
        <p className="text-size0-p m-1">Senaste Rapporterna</p>
        <ul>
          {Array.from({ length: 3 }).map((_, i) => (
            <li
              key={i}
              className="text-black m-1.5 p-1 px-2 width text-size0-p bg-white flex justify-between hover:bg-light-bg"
            >
              <p>Rån</p>
              <p>Malmö</p>
              <button className="bg-dark-bg rounded-sm w-5 flex items-center">
                <img src={arrow} alt="" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <a href="#" className="text-size0-p text-end highlight px-2">
        se de senaste 500 rapporterna
      </a>
    </div>
  );
}
