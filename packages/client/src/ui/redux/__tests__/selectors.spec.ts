import { RootState } from 'client/ui/redux/types';
import { eventSelector } from 'client/ui/redux/selectors';

describe('redux store selectors', () => {
  test('selects event with id', () => {
    const pseudoState = ({
      events: { 1: { id: 1, name: 'nice event', liver: 99 } },
      livers: { 99: { id: 99, name: 'nice liver' } },
    } as any) as RootState;

    const result = eventSelector(pseudoState, 1);

    expect(result.name).toEqual('nice event');
    expect(result.liver.name).toEqual('nice liver');
  });
});
