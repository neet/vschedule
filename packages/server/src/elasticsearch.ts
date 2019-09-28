import { Client } from '@elastic/elasticsearch';

const activityIndex = 'activity';
const performerIndex = 'performer';
const categoryIndex = 'category';
const teamIndex = 'team';

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
    node: 'http://localhost:9200',
  });

  await client.indices
    .exists({
      index: activityIndex,
    })
    .then(async existence => {
      if (!existence.body) {
        await client.indices.create({
          index: activityIndex,
          body: activityDef,
        });
      }
    });

  await client.indices
    .exists({
      index: performerIndex,
    })
    .then(async existence => {
      if (!existence.body) {
        await client.indices.create({
          index: performerIndex,
          body: performerDef,
        });
      }
    });

  await client.indices
    .exists({
      index: categoryIndex,
    })
    .then(async existence => {
      if (!existence.body) {
        await client.indices.create({
          index: categoryIndex,
          body: categoryDef,
        });
      }
    });

  await client.indices
    .exists({
      index: teamIndex,
    })
    .then(async existence => {
      if (!existence.body) {
        await client.indices.create({
          index: teamIndex,
          body: teamDef,
        });
      }
    });

  return client;
};
