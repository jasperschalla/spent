export const groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };


export const getMonthNumber = (month) => {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    return months.indexOf(month)
}