// Convert timestamp into readable date string
export const timeConvert = (timestamp) => {
  return new Date(timestamp * 1000).toDateString();
};

// Convert timestap into HTML input date format
export const inputDate = (timestamp) => {
  let date = new Date(timestamp * 1000);
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  date = date.getFullYear() + "-" + month + "-" + day;
  return date;
};

// convert YYYY-mm-dd to dd/mm/YYYY
export const convertDate = (date) => {
  const timeArray = date.split("-");
  return timeArray[2] + "/" + timeArray[1] + "/" + timeArray[0];
};

// Tooltips
export const renderTooltip = (props) => {
  return (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );
};
