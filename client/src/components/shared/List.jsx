function List({ boxDesign }) {
  const UI = {
    ui: boxDesign,
    icons: [],
    heading:,
    data:,
    width:,
    height:,
    cols:,
    rows:,
  };

  return (
    <>
      <table>
        <thead>
            <tr>
                <th>UI.heading</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                {UIdata.map((data)=>{
                    <td></td>
                })}
            </tr>
        </tbody>
      </table>
      <p>Bajs</p>
      <p>Bajs</p>
      <p>Bajs</p>
    </>
  );
}

export default List;
