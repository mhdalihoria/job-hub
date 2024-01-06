const formatTime = (date) => {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString("en-GB");
};

export default formatTime;
