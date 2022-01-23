import type { ComponentType } from 'react';
import { createElement, useRef, useState } from 'react';

import { Button } from '../Button';
import { Modal } from '../Modal';
import { Typography } from '../Typography';

export interface SlideProps {
  readonly title: string;
  readonly pages: readonly ComponentType[];
  readonly show: boolean;
  readonly onHide?: () => void;
}

export const Slide = (props: SlideProps): JSX.Element => {
  const { title, pages, show, onHide } = props;

  const [pageNum, setPageNum] = useState(0);
  const titleNode = useRef<HTMLElement | null>(null);

  const handleClickNext = (): void => {
    titleNode.current?.focus();
    setPageNum(pageNum + 1);
  };

  const handleClickPrevious = (): void => {
    titleNode.current?.focus();
    setPageNum(pageNum - 1);
  };

  const handleComplete = (): void => {
    onHide?.();
  };

  return (
    <Modal show={show} title={title} onHide={handleComplete}>
      <Modal.Window
        aria-live="polite"
        aria-label={`${pages.length}件中${pageNum + 1}件目`}
        aria-roledescription="スライド"
      >
        <Modal.Title ref={titleNode}>{title}</Modal.Title>

        {createElement(pages[pageNum])}

        <Modal.Footer aria-live="off">
          <Typography
            variant="wash"
            size="sm"
            className="tabular-nums"
            aria-hidden
          >
            {pageNum + 1} / {pages.length}
          </Typography>

          <div className="space-x-2">
            {pageNum + 1 !== 1 && (
              <Button variant="wash" onClick={handleClickPrevious}>
                前へ
              </Button>
            )}

            {pageNum + 1 === pages.length ? (
              <Button onClick={handleComplete}>閉じる</Button>
            ) : (
              <Button onClick={handleClickNext}>次へ</Button>
            )}
          </div>
        </Modal.Footer>
      </Modal.Window>
    </Modal>
  );
};
