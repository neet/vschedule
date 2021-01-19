import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';

import packageJSON from '../../../../package.json';
// export interface MigrationProps {}

const ZeroOneZero = dynamic(import('./v0.1.0'));
const ZeroTwoZero = dynamic(import('./v0.2.0'));

export const ChangeLog = (/* props: MigrationProps */): JSX.Element | null => {
  const [migration, setMigration] = useState(false);
  const [version, setVersion] = useLocalStorage('version', packageJSON.version);

  useEffect(() => {
    if (version !== packageJSON.version) {
      setMigration(true);
    }
  }, [version]);

  const handleComplete = (): void => {
    setMigration(false);
    setVersion(packageJSON.version);

    gtag('event', 'complete_change_log', {
      event_label: packageJSON.version,
    });
  };

  if (packageJSON.version === '0.1.0') {
    return <ZeroOneZero show={migration} onHide={handleComplete} />;
  }

  if (packageJSON.version === '0.2.0') {
    return <ZeroTwoZero show={migration} onHide={handleComplete} />;
  }

  return null;
};
