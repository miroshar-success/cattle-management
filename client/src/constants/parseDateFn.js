export function parseDate(date) {
  try {
    if (!date) {
      return null;
    }
    let toUnix = Date.parse(date);
    let unixToNewDate = new Date(toUnix);
    return `${unixToNewDate.toLocaleString()}`;
  } catch (error) {
    console.log("Error al convertir a fecha.");
    return null;
  }
}

export function parseDateWithNoHours(date) {
  try {
    if (!date) {
      return null;
    }
    let toUnix = Date.parse(date);
    let unixToNewDate = new Date(toUnix);
    let dateWithNoOurs = unixToNewDate.toLocaleString().split(",")[0];
    return `${dateWithNoOurs}`;
  } catch (error) {
    console.log("Error al convertir a fecha.");
    return null;
  }
}

export function helperParseDateForInput(date) {
  if (!date) {
    return "";
  } else {
    let parsedDate = date.split("T")[0];
    return parsedDate;
  }
}
