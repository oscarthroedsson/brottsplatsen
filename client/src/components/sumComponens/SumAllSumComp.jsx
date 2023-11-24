import SumUpAfterNoon from "./SumAfterNoon";
import SumEvning from "./SumEvning";
import SumUpMorning from "./SumUpMorning";
import SumWeek from "./SumWeek";
import SumWeekend from "./SumWeekend";
import SumInformation from "./SumInformation";

export default function SumAllSumComp() {
  return (
    <div className="sectionLayout  px-6 grid grid-cols-1 grid-row-auto  gap-5 lg:grid-cols-2">
      <SumUpMorning />
      <SumUpAfterNoon />
      <SumEvning />
      <SumWeek />
      <SumWeekend />
      <SumInformation />
    </div>
  );
}
