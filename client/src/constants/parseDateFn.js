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
