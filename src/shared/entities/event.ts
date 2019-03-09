import { Liver } from "./liver";

export interface Event {
  /** ID of the event */
  id: number;
  /** Name of the event */
  name: string;
  /** Description of the event */
  description: string;
  /** Whether public */
  public: number;
  /** URL of the event */
  url: string;
  /** Started date time on ISO 8601 */
  start_date: string;
  /** Finished date time on ISO 8601 */
  end_date: string;
  /** Whether the event is recommended for the user  */
  recommend: boolean;
  /** Owner of the event */
  liver: Liver;
}

export interface EventList {
  events: Event[];
}
