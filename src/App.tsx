import { useState, useEffect } from "react";
import csvFilesToJson from "../data/read";
import DragDropCalendar from "./DragDropCalendar";

const FILENAMES = ["colab.csv", "itcd.csv", "xcolab.csv", "xitcd.csv"];
const FILEPATHS = FILENAMES.map((filename) => "../data/" + filename);
import { Booking } from "./Types";

function App() {
  const [data, setData] = useState<Booking[]>([]);

  useEffect(() => {
    const handleLoadData = async () => {
      const json = await csvFilesToJson(FILEPATHS);
      setData(json);
    };

    handleLoadData();
  }, []);

  return (
    <div>
      <DragDropCalendar data={data} />
    </div>
  );
}

export default App;
