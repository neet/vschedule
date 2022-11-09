import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

interface ItemProps {
  readonly title: string;
  readonly href: string;
  readonly icon: ReactNode;
}

export const Item = (props: ItemProps): JSX.Element => {
  const { title, href, icon } = props;
  const router = useRouter();
  const active = router.pathname === href;

  return (
    <Link href={href} passHref>
      <a
        className={classNames(
          'flex',
          'items-center',
          'text-xl',
          'md:text-lg',
          'px-2',
          'py-1',
          'leading-snug',
          'rounded',
          'transition-colors',
          'ease-out',
          !active && [
            'text-gray-700',
            'bg-gray-100',
            'hover:bg-gray-200',
            'active:bg-gray-300',
            'dark:text-neutral-100',
            'dark:bg-neutral-900',
            'dark:hover:bg-neutral-800',
            'dark:active:bg-neutral-700',
          ],
          active && [
            'text-primary-500',
            'bg-gray-200',
            'hover:bg-primary-100',
            'active:bg-primary-200',
            'dark:text-primary-400',
            'dark:bg-neutral-900',
            'dark:hover:bg-neutral-800',
            'dark:active:bg-neutral-700',
          ],
        )}
      >
        <span className="mr-3 md:mr-2">{icon}</span>
        <span>{title}</span>
      </a>
    </Link>
  );
};
