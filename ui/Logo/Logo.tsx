import classNames from 'classnames';

export interface LogoProps {
  readonly alt: string;
  readonly src: string;
}

export const Logo = (props: LogoProps): JSX.Element => {
  const { alt, src } = props;

  return <img className={classNames('hover:opacity-50')} alt={alt} src={src} />;
};
