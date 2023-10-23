export default function StackedBarChart({ valueOne, valueTwo, valueThree }) {
  const total = valueOne + valueTwo + valueThree;

  valueOne = {
    value: valueOne,
    bgColor: "#4951E2",
    label: "Missahndel",
    get width() {
      return Math.round((this.value / total) * 100);
    },
  };

  valueTwo = {
    value: valueTwo,
    bgColor: "#829AF6",
    label: "Rån",
    get width() {
      return Math.round((this.value / total) * 100);
    },
  };
  valueThree = {
    value: valueThree,
    bgColor: "#3237A1",
    label: "Mord",
    get width() {
      return Math.round((this.value / total) * 100);
    },
  };

  const data = [valueOne, valueTwo, valueThree];
  return (
    <>
      <div className="flex p-5 w-full h-20 ">
        <div
          style={{
            backgroundColor: valueOne.bgColor,
            width: `${valueOne.width}%`,
          }}
          className={"centerElements h-8 text-white text-size1-p"}
        >
          <p className="text-white text-size1-p"> {valueOne.value} st</p>
        </div>
        <div
          style={{
            backgroundColor: valueTwo.bgColor,
            width: `${valueTwo.width}%`,
          }}
          className={"centerElements h-8 p-1 pl-3 text-white text-size1-p"}
        >
          <p className="text-white text-size1-p"> {valueTwo.value} st</p>
        </div>
        <div
          style={{
            backgroundColor: valueThree.bgColor,
            width: `${valueThree.width}%`,
          }}
          className={"centerElements h-8 p-1 pl-3 "}
        >
          <p className="text-white text-size1-p"> {valueThree.value} st</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-5 w-full">
        {data.map((item) => {
          return (
            <div
              key={item.label}
              className="flex jystify-center items-center gap-2 text-size1-p"
            >
              <div
                style={{
                  backgroundColor: item.bgColor,
                  width: "10px",
                  height: "10px",
                }}
              ></div>
              <p>{item.label}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
