import { useContext, useEffect } from "react";
import { IBookingsContext, BookingsContext } from "../contexts/BookingsContext";
import csvFilesToJson from "../../data/read";

const useBookings = () => {
  const { bookings, setBookings } = useContext<IBookingsContext>(BookingsContext);

  useEffect(() => {
    const FILENAMES = ["colab.csv", "itcd.csv", "xcolab.csv", "xitcd.csv"];
    const FILEPATHS = FILENAMES.map((filename) => "../../data/" + filename);

    const handleLoadData = async () => {
      const json = await csvFilesToJson(FILEPATHS);
      setBookings(json);
    };

    handleLoadData();
  }, []);
  return { bookings };
};

export default useBookings;
