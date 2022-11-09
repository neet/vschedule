import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { H, Section } from 'react-headings';

import { api } from '../api';
import { useGenres } from '../components/hooks/useGenres';
import Article from '../components/layouts/Article';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import type { GenresResponse } from '../types';

export interface TagsProps {
  readonly data: GenresResponse;
}

const DAILY = 86400;

export const getStaticProps: GetStaticProps<TagsProps> = async () => {
  return {
    props: {
      data: await api.fetchGenres(),
    },
    revalidate: DAILY,
  };
};

const Tags = (props: TagsProps): JSX.Element => {
  const { data } = props;
  const { genres } = useGenres({ fallbackData: data });

  return (
    <Section
      component={<Typography.FourXl as={H}>タグ別の配信一覧</Typography.FourXl>}
    >
      <Head>
        <title>タグ別の配信一覧 | Refined Itsukara.link</title>
        <meta name="description" content="このページは現在実装中です" />
      </Head>

      <Typography.Base>にじさんじのタグ別の配信一覧です。</Typography.Base>

      {genres?.map((genre) => (
        <Card key={genre.id} variant="wash">
          <Link href={`/?genre=${genre.id}`} passHref>
            <a className="block group">
              <div className={classNames('flex', 'items-center', 'space-x-4')}>
                <div
                  className={classNames(
                    'bg-primary-500',
                    'text-white',
                    'w-10',
                    'h-10',
                    'rounded-full',
                    'flex',
                    'justify-center',
                    'items-center',
                  )}
                >
                  <FontAwesomeIcon icon={faHashtag} />
                </div>

                <H className={classNames('group-hover:underline')}>
                  {genre.name}
                </H>
              </div>
            </a>
          </Link>
        </Card>
      ))}
    </Section>
  );
};

Tags.Layout = Article;

export default Tags;
