import React from 'react';
import { Helmet } from 'react-helmet';

interface SeoProps {
  title?: string;
  description?: string;
}

export const Seo = (props: SeoProps) => {
  const { title, description } = props;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
};
