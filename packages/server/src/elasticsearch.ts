import { Client } from '@elastic/elasticsearch';

export const createElasticsearchConnection = async () => {
  return new Client({
    node: 'http://localhost:9200',
  });
};
