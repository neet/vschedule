import React, { useRef, useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { ActivityFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';
import { isOverlapping } from 'src/utils/is-overlapping';
import { sortEvents } from 'src/utils/sort-events';
import { Spell } from './spell';
import { Marker } from './marker';
// import { SPELL_WIDTH } from './layout';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  /* margin: 0 -3000px; */
  /* margin-left: 0; */
  /* overflow-x: scroll; */
  /* overflow-y: hidden; */
  background-color: ${({ theme }) => theme.backgroundWash};
  -webkit-overflow-scrolling: touch;
`;

const getTimetableRange = (activities: ActivityFragment[]) => {
  // prettier-ignore
  const timetableStartAt = activities.reduce<Dayjs | undefined>((result, activity) => {
    if (!result || result.isAfter(activity.startAt)) {
      result = dayjs(activity.startAt);
    }
    return result;
  }, undefined);

  // prettier-ignore
  const timetableEndAt = activities.reduce<Dayjs | undefined>((result, activity) => {
    if (!result || result.isBefore(activity.endAt)) {
      result = dayjs(activity.endAt);
    }
    return result;
  }, undefined);

  if (!timetableStartAt || !timetableEndAt) {
    throw Error('provide at least 1 activity');
  }

  return { timetableStartAt, timetableEndAt };
};

const createRangeDate = (startAt: Dayjs, endAt: Dayjs, each: number) => {
  const length = dayjs(endAt).diff(startAt, 'minute') / each;

  return Array.from({ length }, (_, i) => {
    const basis = startAt.clone();
    return basis.add(i * each, 'minute');
  });
};

const groupMarkersByRow = (
  sortedContents: ActivityFragment[],
  result: ActivityFragment[][] = [],
): ActivityFragment[][] => {
  if (!sortedContents.length) {
    return result;
  }

  // Init current row
  result.push([]);
  const current = result[result.length - 1];

  const rest = sortedContents.reduce<ActivityFragment[]>(
    (restContents, content) => {
      if (!current.length) {
        current.push(content);
        return restContents;
      }

      const prev = current[current.length - 1];

      if (!isOverlapping(content, prev)) {
        current.push(content);
        return restContents;
      }

      restContents.push(content);

      return restContents;
    },
    [],
  );

  return groupMarkersByRow(rest, result);
};

// const toPixel = (minute: number) => {
//   const pixelPerMinute = SPELL_WIDTH / 30;

//   return minute * pixelPerMinute;
// };

export interface TimetableProps {
  activities?: ActivityFragment[];
  loading: boolean;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  onLoadNext?: () => void;
  onLoadPrevious?: () => void;
}

export const Timetable = (props: TimetableProps) => {
  const {
    activities,
    onLoadNext,
    // onLoadPrevious,
    loading,
    hasNextPage,
    // hasPreviousPage,
  } = props;

  const node = useRef<HTMLDivElement>(null);
  const initialTimetableStartAt = useRef<Dayjs>();
  const [scroll, scrollTo] = useState(0);

  useEffect(() => {
    if (scroll > 200 && !loading && hasNextPage) {
      // console.log('loading prev');
      onLoadNext && onLoadNext();
    }
  }, [scroll, onLoadNext, loading, hasNextPage]);

  if (!activities) return null;

  const { timetableStartAt, timetableEndAt } = getTimetableRange(activities);

  const spells = createRangeDate(
    timetableStartAt.minute(0),
    timetableEndAt.minute(0),
    30,
  );

  // const scrollableWidth = timetableEndAt.diff(timetableStartAt, 'minute') / 30;

  const markers = groupMarkersByRow(activities.sort(sortEvents))
    .map((row, i) =>
      row.map(activity => ({
        activity,
        row: i,
      })),
    )
    .flat()
    .sort((a, b) => sortEvents(a.activity, b.activity));

  if (!initialTimetableStartAt.current) {
    initialTimetableStartAt.current = timetableStartAt;
  }

  if (!initialTimetableStartAt.current) {
    return null;
  }

  const handleWheel = (e: React.WheelEvent) => {
    scrollTo(scroll + e.deltaY);
  };

  // const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
  //   if (e.currentTarget.scrollLeft === 200) {
  //     onLoadPrevious && onLoadPrevious();
  //   } else if (e.currentTarget.scrollWidth - e.currentTarget.scrollLeft < 200) {
  //     onLoadNext && onLoadNext();
  //   }
  // };

  return (
    <Wrapper
      ref={node}
      // onScroll={handleScroll}
      onWheel={handleWheel}
      style={{
        transform: `translateX(${scroll}px)`,
        // marginLeft: `${-scroll}px`,
      }}
    >
      <div>
        {spells.map(spell => (
          <Spell
            key={spell.valueOf()}
            date={spell}
            timetableStartAt={initialTimetableStartAt.current}
          />
        ))}
      </div>

      <div>
        {markers.map(({ activity, row }, i) => (
          <Marker
            key={`${i}-${activity.id}`}
            row={row}
            activity={activity}
            timetableStartAt={initialTimetableStartAt.current}
          />
        ))}
      </div>
    </Wrapper>
  );
};
