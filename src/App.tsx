import { useState, useEffect } from "react";
import csvFilesToJson from "../data/read";

const FILENAMES = ["colab.csv", "itcd.csv", "xcolab.csv", "xitcd.csv"];
const FILEPATHS = FILENAMES.map((filename) => "../data/" + filename);
type Booking = {
  uuid: string;
  status: string;
  date: string;
  start_time: string;
  end_time: string;
  user_uuid: string;
  name: string;
  code: string;
  type: string;
};

function App() {
  const [data, setData] = useState<Booking[] | []>([]);

  useEffect(() => {
    const handleLoadData = async () => {
      const json = await csvFilesToJson(FILEPATHS);
      setData(json);
    };

    handleLoadData();
  }, []);

  return (
    <div>
      {data?.map((item, index) => (
        <div key={index}>{JSON.stringify(item)}</div>
      ))}
    </div>
  );
}

export default App;
