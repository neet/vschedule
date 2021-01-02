import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';

import packageJSON from '../../../../package.json';
import { useTutorial } from '../../hooks/useTutorial';
// export interface MigrationProps {}

const ZeroOneZero = dynamic(import('./v0.1.0'));

export const ChangeLog = (/* props: MigrationProps */): JSX.Element | null => {
  // const {} = props;
  const [migration, setMigration] = useState(false);
  const { hasTutorialDone } = useTutorial();

  // TODO: Use packageJSON.version
  const [version, setVersion] = useLocalStorage(
    'version',
    hasTutorialDone ? '0.0.0' : packageJSON.version,
  );

  useEffect(() => {
    if (version !== packageJSON.version) {
      setMigration(true);
    }
  }, [version]);

  const handleComplete = (): void => {
    setMigration(false);
    setVersion(packageJSON.version);
  };

  if (packageJSON.version === '0.1.0') {
    return <ZeroOneZero show={migration} onHide={handleComplete} />;
  }

  return null;
};
