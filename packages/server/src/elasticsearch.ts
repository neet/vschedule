import { Client } from '@elastic/elasticsearch';
import { ES_HOST, ES_PREFIX, ES_PORT } from './config';

export const indices = {
  activity: [ES_PREFIX, 'activity'].join(''),
  team: [ES_PREFIX, 'team'].join(''),
  category: [ES_PREFIX, 'category'].join(''),
  performers: [ES_PREFIX, 'performer'].join(''),
};

const settings = {
  analysis: {
    analyzer: {
      ngram: {
        type: 'custom',
        tokenizer: 'ngram',
      },
    },
    tokenizer: {
      ngram: {
        type: 'ngram',
        min_gram: 2,
        max_gram: 3,
        token_chars: ['letter', 'digit'],
      },
    },
  },
};

const activityDef = {
  settings,
  mappings: {
    _doc: {
      properties: {
        name: {
          type: 'text',
          analyzer: 'ngram',
        },
        description: {
          type: 'text',
          analyzer: 'ngram',
        },
      },
    },
  },
};

const performerDef = {
  settings,
  mappings: {
    _doc: {
      properties: {
        name: {
          type: 'text',
          analyzer: 'ngram',
        },
        description: {
          type: 'text',
          analyzer: 'ngram',
        },
      },
    },
  },
};

const categoryDef = {
  settings,
  mappings: {
    _doc: {
      properties: {
        name: {
          type: 'text',
          analyzer: 'ngram',
        },
      },
    },
  },
};

const teamDef = {
  settings,
  mappings: {
    _doc: {
      properties: {
        name: {
          type: 'text',
          analyzer: 'ngram',
        },
      },
    },
  },
};

export const createElasticsearchConnection = async () => {
  const client = new Client({
    node: `http://${ES_HOST}:${ES_PORT}`,
  });

  await client.indices
    .exists({
      index: indices.activity,
    })
    .then(async (existence) => {
      if (!existence.body) {
        await client.indices.create({
          index: indices.activity,
          body: activityDef,
        });
      }
    });

  await client.indices
    .exists({
      index: indices.performers,
    })
    .then(async (existence) => {
      if (!existence.body) {
        await client.indices.create({
          index: indices.performers,
          body: performerDef,
        });
      }
    });

  await client.indices
    .exists({
      index: indices.category,
    })
    .then(async (existence) => {
      if (!existence.body) {
        await client.indices.create({
          index: indices.performers,
          body: categoryDef,
        });
      }
    });

  await client.indices
    .exists({
      index: indices.team,
    })
    .then(async (existence) => {
      if (!existence.body) {
        await client.indices.create({
          index: indices.team,
          body: teamDef,
        });
      }
    });

  return client;
};
