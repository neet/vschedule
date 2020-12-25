import { Transition } from '@headlessui/react';
import dayjs from 'dayjs';
import { useInView } from 'react-intersection-observer';
import classNames from 'classnames';
import type { Event as EventType } from '../../types';
import { Avatar } from '../../ui/Avatar';
import { Marker } from '../../ui/Marker';
import { Card } from '../../ui/Card';
import { Event } from '../Event';
import { usePopper } from 'react-popper';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useDelayedHover } from '../../hooks/useDelayedHover';

export interface EventProps {
  readonly event: EventType;
}

export const EventMarker = (props: EventProps): JSX.Element => {
  const { event } = props;

  const { ref, inView } = useInView({
    root: document.getElementById('timetable'),
    rootMargin: '200px',
  });

  const { hover, handleFocus, handleBlur } = useDelayedHover();
  const [wrapperRef, setWrapperRef] = useState<HTMLDivElement>(null);
  const [cardRef, setCardRef] = useState<HTMLDivElement>(null);

  const { styles, attributes } = usePopper(wrapperRef, cardRef, {
    placement: 'bottom',
    modifiers: [{ name: 'flip', enabled: true }],
  });

  return (
    <div
      className={classNames(
        'box-border',
        'px-2',
        'transition-opacity',
        'duration-75',
        { 'opacity-0': !inView },
      )}
      ref={setWrapperRef}
    >
      <a
        href={event.url}
        rel="noreferrer"
        target="_blank"
        ref={ref}
        className={classNames(
          'block',
          'focus:outline-none',
          'focus:ring',
          'ring-primary-500',
          'dark:ring-primary-400',
        )}
        onMouseOver={() => handleFocus()}
        onMouseLeave={() => handleBlur()}
        onFocus={() => handleFocus(true)}
        onBlur={() => handleBlur()}
      >
        <Marker backgroundColor={event.livers[0].color}>
          <div className="flex-shrink-0 mr-1">
            <Avatar
              loading="lazy"
              variant="minimal"
              src={event.livers[0].avatar}
              alt={event.livers[0].name}
            />
          </div>

          <div className="flex flex-col min-w-0 justify-center">
            <div className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden leading-none text-sm">
              {event.name}
            </div>

            {/* for display users the start and end dates are obvious */}
            <dl className="sr-only">
              <dt>開始時刻</dt>
              <dd>{dayjs(event.start_date).format('LLL')}</dd>

              <dt>終了時刻</dt>
              <dd>{dayjs(event.start_date).format('LLL')}</dd>
            </dl>

            <div className="overflow-ellipsis w-full whitespace-nowrap overflow-hidden text-sm leading-none mt-1">
              {event.livers.map((liver) => liver.name).join(', ')}
            </div>
          </div>
        </Marker>
      </a>

      {createPortal(
        <Transition
          show={hover}
          className="absolute z-20" // TODO: combine with popper
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div ref={setCardRef} style={styles.popper} {...attributes.popper}>
            <Card
              size="sm"
              className={classNames(
                'box-border',
                'w-72',
                'shadow-lg',
                'bg-white',
                'dark:bg-black',
                'dark:border',
                'dark:border-trueGray-800',
              )}
            >
              <Event event={event} variant="flat" />
            </Card>
          </div>
        </Transition>,
        document.body,
      )}
    </div>
  );
};
