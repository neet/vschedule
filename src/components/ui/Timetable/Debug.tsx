import { useTimetable } from './useTimetable';

export interface DebugProps {
  readonly extra: Readonly<Record<string, unknown>>;
}

export const Debug = (props: DebugProps): JSX.Element => {
  const timetable = useTimetable();

  return (
    <pre className="text-xs absolute text-green-500 bottom-0 left-0 font-mono bg-black">
      {JSON.stringify(
        {
          interval: timetable.interval,
          scale: timetable.scale,
          itemHeight: timetable.itemHeight,
          focusedAt: timetable.focusedAt,
          endAt: timetable.endAt,
          startAt: timetable.startAt,
          ...props.extra,
        },
        null,
        2,
      )}
    </pre>
  );
};
