import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import type { NextPage } from 'next';
import Link from 'next/link';

import { Layout } from '../components/app/Layout';
import { useGenres } from '../components/hooks/useGenres';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';

const Tags: NextPage = () => {
  const { data } = useGenres();

  return (
    <Layout
      variant="article"
      title="タグ別の配信一覧 | Refined Itsukara.link"
      description="このページは現在実装中です"
    >
      <Typography.H1>タグ別の配信一覧</Typography.H1>
      <Typography.Paragraph>
        にじさんじのタグ別の配信一覧です。
      </Typography.Paragraph>

      {data?.data.genres.map((genre) => (
        <Card key={genre.id} variant="wash">
          <Link href={`/?genre=${genre.id}`}>
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

                <h3 className={classNames('group-hover:underline')}>
                  {genre.name}
                </h3>
              </div>
            </a>
          </Link>
        </Card>
      ))}
    </Layout>
  );
};

export default Tags;
