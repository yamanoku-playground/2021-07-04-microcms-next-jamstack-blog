import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'yamanoku-oss-activity',
  apiKey: process.env.API_KEY,
});
