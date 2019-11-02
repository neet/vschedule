import agenda from '@ril/arts/static/agenda.png';
import screenshot from '@ril/arts/static/screenshot.png';
import timetable from '@ril/arts/static/timetable.png';
import streamerOrCollab from '@ril/arts/static/streamer-or-collab.png';
import search from '@ril/arts/static/search.png';
import React, { useState } from 'react';
import { useLocalStorage } from 'react-use';
import { useTranslation, Trans } from 'react-i18next';
import { styled } from 'src/styles';
import { Modal } from 'src/components/modal';
import { MODAL } from 'src/styles/z-indices';
import { Button } from '../button';

const Wrapper = styled.div`
  position: fixed;
  z-index: ${MODAL};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  max-width: 750px;
  max-height: 500px;
  margin: auto;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  margin: auto;
  overflow: hidden;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.backgroundNormal};
`;

const Thumbnail = styled.div`
  flex: 3 0 30%;
  background-color: ${({ theme }) => theme.highlightNormal};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const Content = styled.section`
  flex: 1 1 auto;
  padding: 12px;
  font-size: 16px;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.foregroundNormal};
  font-size: 18px;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.foregroundNormal};

  strong {
    font-weight: bold;
  }
`;

const PageCount = styled.span`
  flex: 1 1 auto;
  color: ${({ theme }) => theme.foregroundLight};
  text-align: left;
`;

const Toolbox = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: flex-end;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.backgroundDark};

  & > *:not(:last-child) {
    margin-right: 14px;
  }
`;

const Page1 = () => {
  const { t } = useTranslation();

  return (
    <>
      <Thumbnail
        style={{ backgroundImage: `url(${screenshot})` }}
        title={t('getting-started.1.title', {
          defaultValue: 'Getting started',
        })}
      />

      <Content>
        <Title>
          {t('getting-started.1.title', { defaultValue: 'Getting started' })}
        </Title>
        <Description>
          <Trans i18nKey="getting-started.1.description">
            <strong>Welcome to Refined Itsukara.link!</strong> This website is{' '}
            <strong>unofficial</strong> redesign of the schedular{' '}
            <a href="https://www.itsukaralink.jp/">Itsukara.link</a> offered by{' '}
            <a href="https://nijisanji.ichikara.co.jp/">Nijisanji </a>a Virtual
            Youtubers Network. Let me show you how to use!
          </Trans>
        </Description>
      </Content>
    </>
  );
};

const Page2 = () => {
  const { t } = useTranslation();

  return (
    <>
      <Thumbnail
        style={{ backgroundImage: `url(${timetable})` }}
        title={t('getting-started.2.title', {
          defautValue: 'Checking live streams',
        })}
      />
      <Content>
        <Title>
          {t('getting-started.2.title', {
            defaultValue: 'Checking live streams',
          })}
        </Title>
        <Description>
          <Trans i18nKey="getting-started.2.description">
            In the centre of the screen, you can see{' '}
            <strong>past and upcoming streams</strong>. You can tap to open the{' '}
            stream on YouTube. <br />
            You can also back and forth the timetable{' '}
            <strong>by scrolling horizontally</strong> (if you&rsquo;re using
            from desktop, hold shift and spin the wheel).
          </Trans>
        </Description>
      </Content>
    </>
  );
};

const Page3 = () => {
  const { t } = useTranslation();

  return (
    <>
      <Thumbnail
        style={{ backgroundImage: `url(${streamerOrCollab})` }}
        title={t('getting-started.3.title', {
          defaultValue: 'Streamers and Collabs',
        })}
      />

      <Content>
        <Title>
          {t('getting-started.3.title', {
            defaultValue: 'Streamers and Collabs',
          })}
        </Title>
        <Description>
          <Trans i18nKey="getting-started.3.description">
            The advantage of Refined Itsukara.link is{' '}
            <strong>not just the design</strong>.<br />
            We also have a page which makes us possible to{' '}
            <strong>explore streams by a streamer or a collaboration</strong>.
            Try it out when there are too many streams to find the desired one!
          </Trans>
        </Description>
      </Content>
    </>
  );
};

const Page4 = () => {
  const { t } = useTranslation();

  return (
    <>
      <Thumbnail
        style={{ backgroundImage: `url(${search})` }}
        title={t('getting-started.4.title', { defaultValue: 'Search' })}
      />

      <Content>
        <Title>
          {t('getting-started.4.title', {
            defaultValue: 'Search',
          })}
        </Title>
        <Description>
          <Trans i18nKey="getting-started.4.description">
            Of course, we have <strong>search feature</strong> too. By typing a{' '}
            keyword, you can search for{' '}
            <strong>categories, streamers, collaborations, streams</strong> so
            that you will not miss your favourite stream.
          </Trans>
        </Description>
      </Content>
    </>
  );
};

const Page5 = () => {
  const { t } = useTranslation();

  return (
    <>
      <Thumbnail
        style={{ backgroundImage: `url(${agenda})` }}
        title={t('getting-started.5.title', { defaultValue: 'Contribution' })}
      />

      <Content>
        <Title>
          {t('getting-started.5.title', {
            defaultValue: 'Contribution',
          })}
        </Title>
        <Description>
          <Trans i18nKey="getting-started.5.description">
            Did you get how to use it? Send questions, feature requests,{' '}
            improvements, and bug reports to Twitter (
            <a href="https://twitter.com/TheGodOfNeet">@TheGodOfNeet</a>
            ）or GitHub (
            <a href="https://github.com/neet/refined-itsukara-link">
              neet/refined-itsukara-link
            </a>
            )!
            <br />
            The project is open source software and we are looking for{' '}
            contributors who can implement better! Enjoy!
          </Trans>
        </Description>
      </Content>
    </>
  );
};

// eslint-disable-next-line react/jsx-key
const index = [<Page1 />, <Page2 />, <Page3 />, <Page4 />, <Page5 />];

export const GettingStarted = () => {
  const { t } = useTranslation();
  const [page, paginate] = useState(0);

  // prettier-ignore
  const [hasGotStarted, setHasGotStarted]= useLocalStorage('has-got-started', false);
  const done = hasGotStarted || page > 5;

  const handleNext = () => {
    if (page + 1 >= index.length) {
      setHasGotStarted(true);
    }

    paginate(Math.min(index.length, page + 1));
  };

  const handlePrev = () => {
    paginate(Math.max(0, page - 1));
  };

  const pageContent = index[page] || null;

  return (
    <Modal show={!done} onHide={() => setHasGotStarted(true)}>
      <Wrapper>
        <Inner>
          {pageContent}

          <Toolbox>
            <PageCount>
              {page + 1}/{index.length}
            </PageCount>

            <Button appearance="skeleton" onClick={handlePrev}>
              {t('getting-started.prev', { defaultValue: 'Previous' })}
            </Button>

            <Button appearance="primary" onClick={handleNext}>
              {page + 1 >= index.length
                ? t('getting-started.done', { defaultValue: 'Done' })
                : t('getting-started.next', { defaultValue: 'Next' })}
            </Button>
          </Toolbox>
        </Inner>
      </Wrapper>
    </Modal>
  );
};
