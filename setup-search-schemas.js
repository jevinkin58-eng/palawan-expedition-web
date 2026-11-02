/**
 * Setup Sharetribe search schemas for PalawanExpedition
 * Run: node setup-search-schemas.js
 */
const https = require('https');

const CLIENT_ID = '4d621bd0-b150-4231-96e6-9dbd14b54ec0';
const CLIENT_SECRET = '26ab72369106246c3ab4d514d8fc0f14a0b2fa98';

// Schemas to set
const schemas = [
  { key: 'pub_listingType', type: 'enum', scope: 'public' },
  { key: 'pub_expeditiontype', type: 'enum', scope: 'public' },
  { key: 'pub_tripactivities', type: 'multi-enum', scope: 'public' },
  { key: 'pub_boattype', type: 'enum', scope: 'public' },
  { key: 'pub_sleepingstyle', type: 'multi-enum', scope: 'public' },
  { key: 'pub_sleepinglocation', type: 'multi-enum', scope: 'public' },
  { key: 'pub_crowdexpected', type: 'multi-enum', scope: 'public' },
  { key: 'pub_vibes', type: 'multi-enum', scope: 'public' },
  { key: 'pub_triptype', type: 'multi-enum', scope: 'public' },
  { key: 'pub_retreats', type: 'multi-enum', scope: 'public' },
  { key: 'pub_comfortlevel', type: 'enum', scope: 'public' },
  { key: 'pub_groupsize', type: 'enum', scope: 'public' },
  { key: 'pub_durationindays', type: 'long', scope: 'public' },
  { key: 'pub_tripdurationtype', type: 'enum', scope: 'public' },
];

function request(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function getToken() {
  const postData = `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`;
  const res = await request(
    {
      hostname: 'flex-integ-api.sharetribe.com',
      path: '/v1/auth/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
      },
    },
    postData
  );
  if (res.status !== 200) {
    throw new Error(`Auth failed (${res.status}): ${JSON.stringify(res.body)}`);
  }
  return res.body.access_token;
}

async function listSchemas(token) {
  const res = await request({
    hostname: 'flex-integ-api.sharetribe.com',
    path: '/v1/integration_api/search_schemas/query',
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
}

async function setSchema(token, schema) {
  const postData = JSON.stringify({
    key: schema.key,
    type: schema.type,
    scope: schema.scope,
  });
  const res = await request(
    {
      hostname: 'flex-integ-api.sharetribe.com',
      path: '/v1/integration_api/search_schemas/set',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    },
    postData
  );
  return res;
}

async function main() {
  console.log('Getting access token...');
  const token = await getToken();
  console.log('Authenticated!\n');

  console.log('Current schemas:');
  const current = await listSchemas(token);
  console.log(JSON.stringify(current.body, null, 2), '\n');

  console.log('Setting search schemas...\n');
  for (const schema of schemas) {
    const res = await setSchema(token, schema);
    const ok = res.status >= 200 && res.status < 300;
    console.log(`${ok ? '✓' : '✗'} ${schema.key} (${schema.type}) — ${res.status}`);
    if (!ok) console.log('  ', JSON.stringify(res.body));
  }

  console.log('\nDone! Schemas may take a few minutes to index.');
  console.log('\nVerifying — current schemas after update:');
  const after = await listSchemas(token);
  console.log(JSON.stringify(after.body, null, 2));
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
