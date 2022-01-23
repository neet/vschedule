export interface TriangleProps {
  readonly className?: string;
}

export const Triangle = (props: TriangleProps): JSX.Element => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M8.83231 11.8119C8.13327 13.4097 5.86673 13.4097 5.16769 11.8119L0 -1.19209e-07H14L8.83231 11.8119Z" />
  </svg>
);
