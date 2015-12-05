import childProcess from 'child_process';
import fs from 'fs';
import test from 'ava';
import nock from 'nock';

import nodeSemver, { resolve } from './';

nock('https://nodejs.org')
  .get('/dist/')
  .times(5)
  .reply(200, fs.readFileSync('fixtures.html'));

test('stable version', async t => {
  let { stable } = await nodeSemver();

  t.is(stable, '4.2.1');
});

test('unstable version', async t => {
  let { unstable } = await nodeSemver();

  t.is(unstable, '4.2.1');
});

test('all versions', async t => {
  let { all } = await nodeSemver();

  t.is(all.length, 245);
  t.ok(all.find(v => v === '4.2.1'));
  t.ok(all.find(v => v === '0.11.16'));
});

test('stable versions', async t => {
  let { stableVersions } = await nodeSemver();

  t.is(stableVersions.length, 132);
  t.ok(stableVersions.find(v => v === '4.2.1'));
  t.notOk(stableVersions.find(v => v === '0.11.16'));
});

test('resolve range', async t => {
  let versions = await nodeSemver();

  t.is(resolve(versions, '>=0.8.5 <=0.8.14'), '0.8.14');
});
