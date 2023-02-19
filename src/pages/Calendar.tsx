import { Calendar as BigCalendar, CalendarProps } from "react-big-calendar";

interface CustomCalendarProps extends CalendarProps<any, any> {
  onSelectDate?: (newDate: Date) => void;
}

export const Calendar: React.FC<CustomCalendarProps> = ({ onSelectDate, ...rest }) => {
  const handleSelectDate = (date: Date) => {
    if (onSelectDate) {
      onSelectDate(date);
    }
  };

  return <BigCalendar {...rest} onSelectDate={handleSelectDate} />;
};
