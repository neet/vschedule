import React, { useMemo, useCallback } from 'react';
import { styled } from 'src/styles';
import { Marker, MarkerProps } from './marker';
import { Content } from 'src/generated/graphql';
import { Dayjs } from 'dayjs';
import { sortEvents } from 'src/helpers/sort-events';
import { isOverlapping } from 'src/helpers/is-overlapping';
import { Omit } from 'type-zoo';

export interface FeedProps {
  contents: Content[];
  startDate: Dayjs;
}

const List = styled.ul`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ListItem = styled.li`
  display: block;
`;

export const Feed = (props: FeedProps) => {
  const { contents, startDate } = props;

  /**
   * Calculate the position of markers as a 2-dimentional array.
   * each index of an array represents the Y position (row) of the marker
   * @param events Sorted events to get the position
   * @param result A 2-dimentional array of events per each row
   */
  const getMarkerPositions = useCallback(
    (contents: Content[], result: Content[][] = []): Content[][] => {
      if (!contents.length) {
        return result;
      }

      // Init current row
      result.push([]);
      const current = result[result.length - 1];

      const rest = contents.reduce<Content[]>((rest, content) => {
        if (!current.length) {
          current.push(content);
          return rest;
        }

        const prev = current[current.length - 1];

        if (!isOverlapping(content, prev)) {
          current.push(content);
          return rest;
        }

        rest.push(content);
        return rest;
      }, []);

      return getMarkerPositions(rest, result);
    },
    [],
  );

  // Map rows and events
  const markers = useMemo(
    () =>
      getMarkerPositions(contents.sort(sortEvents))
        .map((row, i) =>
          row.map(
            (content): Required<Omit<MarkerProps, 'startDate'>> => ({
              content,
              row: i,
            }),
          ),
        )
        .flat()
        .sort((a, b) => sortEvents(a.content, b.content)),
    [contents],
  );

  return (
    <List role="feed">
      {markers.map(({ content, row }, i) => (
        <ListItem
          key={`${content.id}-${i}`}
          aria-setsize={contents.length}
          aria-posinset={i + 1}
        >
          <Marker content={content} row={row} startDate={startDate} />
        </ListItem>
      ))}
    </List>
  );
};
