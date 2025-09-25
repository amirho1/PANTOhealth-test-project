import SingleLineChart from "./components/charts/SingleLineChart";
import { checkIsSingle } from "./libs/helpers";
import data from "./mocks/data.json";
import type { Charts, Data, singleData } from "./types";

function App() {
  const charts = (data as Charts).map((chartData, index) => {
    if (checkIsSingle(chartData.data[index]))
      return (
        <SingleLineChart
          key={index}
          title={chartData.title}
          data={chartData.data as Data<singleData>}
        />
      );
  });

  return <div>{charts}</div>;
}

export default App;
