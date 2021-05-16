export const decreaseByOneSafe = (value) => (value > 1 ? value - 1 : value);
export const calculateProgrss = (total, current) =>
  (current.minutes * 60 + current.seconds) / ((total.minutes * 60 + total.seconds) / 100);
