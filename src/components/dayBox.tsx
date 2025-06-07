import React from "react";

interface DayBoxProps {
  day: string;
}

const DayBox: React.FC<DayBoxProps> = ({ day }) => {
  return (
    <div className="border border-gray-300 rounded-md p-6 flex items-center justify-center text-xl font-semibold text-gray-700">
      {day}
    </div>
  );
};

export default DayBox;
