function dayName (day){

switch (day) {
    case 0:
      day = "Sun";
      return day;
    case 1:
      day = "Mon";
      return day;
    case 2:
      day = "Tue";
      return day;
    case 3:
      day = "Wed";
      return day;
    case 4:
      day = "Thu";
      return day;
    case 5:
      day = "Fri";
      return day;
    case 6:
      day = "Sat";
      return day;
    default:
        break;
  }
}

export default dayName;