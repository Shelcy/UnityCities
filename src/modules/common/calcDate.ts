const { format } = require("date-fns");

/**
 *  [helper]
 *  Formato rango de fechas
 *
 *
 */
export function calcDate(type:string) {
  const actualDate = new Date();
  const end:string = format(actualDate, "yyyyMMdd");
  let start:string
  let dateInKpi:string

  switch (type) {
    case "semanal":
      start = format(actualDate.setDate(actualDate.getDate() - 8), "yyyyMMdd");
      dateInKpi = format(actualDate.setDate(actualDate.getDate() - 90), "yyyy-MM-dd");
      break;
    case "mensual":
      start = format(actualDate.setDate(actualDate.getDate() - 30), "yyyyMMdd");
      dateInKpi = format(actualDate.setDate(actualDate.getDate() - 90), "yyyy-MM-dd");
      break;
    case "trimestral" : case "quartil":
      start = format(actualDate.setDate(actualDate.getDate() - 90), "yyyyMMdd");
      dateInKpi = format(actualDate.setDate(actualDate.getDate() - 90), "yyyy-MM-dd");
      break;
    case "anual":
      start = format(
        actualDate.setDate(actualDate.getDate() - 365),
        "yyyyMMdd"
      );
      dateInKpi = format(actualDate.setDate(actualDate.getDate() - 365), "yyyy-MM-dd");
      break;
    default:
      start = format(
        actualDate.setDate(actualDate.getDate() - 365),
        "yyyyMMdd"
      );
      dateInKpi = format(actualDate.setDate(actualDate.getDate() - 365), "yyyy-MM-dd");
      break;
  }
  return { start, end, dateInKpi };
};

