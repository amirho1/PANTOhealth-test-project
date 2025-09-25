import { MultipleLine } from "./components/charts/MultipleLine";
import { SingleLine } from "./components/charts/SingleLine";
import { checkIsSingle } from "./libs/helpers";
import data from "./mocks/data.json";
import type { Charts, Data, multiData, singleData } from "./types";

function App() {
  const charts = (data as Charts).map((chartData, index) => {
    if (checkIsSingle(chartData.data[index]))
      return (
        <SingleLine key={index} title={chartData.title} data={chartData.data as Data<singleData>} />
      );
    return (
      <MultipleLine key={index} title={chartData.title} data={chartData.data as Data<multiData>} />
    );
  });

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexWrap: "wrap",
      }}
    >
      {charts}
    </div>
  );
}

export default App;
