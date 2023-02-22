import Papa from "papaparse";

const csvFileToJson = async (filePath: string): Promise<any[]> => {
  const response = await fetch(filePath);
  const content = await response.text();
  const results = await Papa.parse(content, {
    header: true,
    skipEmptyLines: true,
  });
  return results.data;
};

async function csvFilesToJson(filePaths: string[]): Promise<any[]> {
  const promises = filePaths.map(csvFileToJson);
  const results = await Promise.all(promises);
  return results.flat();
}

export default csvFilesToJson;
