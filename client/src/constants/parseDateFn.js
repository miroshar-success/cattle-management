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

export function calculateAge(birthday) {
  if (!birthday) {
    return null;
  }
  let n = Date.now();
  let d = new Date(birthday);
  let age = n - d;
  console.log("age = ", age);
  console.log(getYears(age));
  let yearsOld = getYears(age);
  return yearsOld.toFixed(1);
  // return age.toFixed(1);
}

function getYears(x) {
  let years = x / 1000 / 60 / 60 / 24 / 365;
  return years;
}
