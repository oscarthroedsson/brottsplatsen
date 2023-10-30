export default function StackedBarChart({ trendsArray }) {
  const total =
    trendsArray[0].count + trendsArray[1].count + trendsArray[0].count;

  const valueOne = {
    value: trendsArray[0].count,
    bgColor: "#4951E2",
    label: trendsArray[0]._id,
    get width() {
      return Math.round((this.value / total) * 100);
    },
  };

  const valueTwo = {
    value: trendsArray[1].count,
    bgColor: "#829AF6",
    label: trendsArray[1]._id,
    get width() {
      return Math.round((this.value / total) * 100);
    },
  };
  const valueThree = {
    value: trendsArray[2].count,
    bgColor: "#3237A1",
    label: trendsArray[2]._id,
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
