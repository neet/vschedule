import { nijisanji } from './src';

nijisanji.map((performer) => {
  console.log(`[[performer]]
${Object.entries(performer)
  .map(([k, v]) => {
    if (typeof v === 'string' && v.includes('\n')) {
      return `${k} = """${v}"""`;
    }
    return `${k} = "${v}"`;
  })
  .join('\n')}
`);
});
