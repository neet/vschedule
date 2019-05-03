import { normalizeLanguageForDayjs } from 'client/ui/locales';

test('normalizes language code when the language is not available on dayjs', () => {
  const result = normalizeLanguageForDayjs('ja-JP');
  expect(result).toBe('ja');
});

test("don't normalize language code when the language is available on dayjs", () => {
  const result = normalizeLanguageForDayjs('zh-cn');
  expect(result).toBe('zh-cn');
});
