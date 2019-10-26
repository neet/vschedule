import dayjs from 'dayjs';

export const findClosestSpell = () => {
  const now = dayjs()
    .second(0)
    .millisecond(0);

  if (now.minute() >= 30) {
    return now.minute(30);
  } else {
    return now.minute(0);
  }
};
