export interface Liver {
  /** ID of the liver */
  id: number;
  /** Name of the liver */
  name: string;
  /** URL of the avatar for the liver */
  avatar: string;
  /** Hex colour code */
  color: string;
  /** Description of the liver */
  description?: string;
  /** Whetehr public (enum of 0/1?) */
  public?: number;
  /** Unknown */
  position?: number;
}
