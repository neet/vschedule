import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Spell } from './spell';

export const createDateSequence = (
  startAt: Dayjs,
  endAt: Dayjs,
  each: number,
) => {
  const length = dayjs(endAt).diff(startAt, 'minute') / each;

  return Array.from({ length }, (_, i) => {
    const basis = startAt.clone();
    return basis.add(i * each, 'minute');
  });
};
interface SpellListProps {
  timetableStartAt: Dayjs;
  timetableEndAt: Dayjs;
}

export const SpellList = (props: SpellListProps) => {
  const { timetableStartAt, timetableEndAt } = props;

  const spells = createDateSequence(
    timetableStartAt.minute(0),
    timetableEndAt.minute(0),
    30,
  );

  return (
    <div>
      {spells.map(spell => (
        <Spell
          key={spell.valueOf()}
          date={spell}
          timetableStartAt={timetableStartAt}
        />
      ))}
    </div>
  );
};
