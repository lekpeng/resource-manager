import Papa from "papaparse";
import { csvBooking } from "../Types";

const csvFileToJson = async (filePath: string): Promise<csvBooking[]> => {
  const response = await fetch(filePath);
  const content = await response.text();
  const results = await Papa.parse(content, {
    header: true,
    skipEmptyLines: true,
  });

  const csvBookings = results.data as csvBooking[];
  return csvBookings;
};

async function csvFilesToJson(filePaths: string[]): Promise<csvBooking[]> {
  const promises = filePaths.map(csvFileToJson);
  const results = await Promise.all(promises);

  return results.flat();
}

export default csvFilesToJson;
