'use strict';

const semver = require('semver');
const got = require('got');

const SEMVER = /[0-9]+\.[0-9]+\.[0-9]+(?:-?(?:[0-9]+|\d*[a-zA-Z-][a-zA-Z0-9-]*)(?:\.(?:[0-9]+|\d*[a-zA-Z-][a-zA-Z0-9-]*))*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?/g;
const TIMEOUT = 20000;
const URL = 'https://nodejs.org/dist/';

function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

module.exports = (mirror) => {
  return got(mirror || URL, {timeout: TIMEOUT}).then((response) => {
    let versions = Array.from(new Set(response.body.match(SEMVER)));
    let all = versions.sort(semver.compare);

    let stableVersions = versions.filter(v => {
      return semver.satisfies(v, '>=1.0.0') || (semver.satisfies(v, '<1.0.0') && semver(v).minor % 2 === 0);
    });

    return {
      all,
      stableVersions,
      stable: last(stableVersions),
      unstable: last(all)
    };
  });
};

module.exports['resolve'] = (versions, range) => {
  if (!semver.validRange(range)) {
    return versions.stable;
  }

  return semver.maxSatisfying(versions.stableVersions, range) ||
    semver.maxSatisfying(versions.all, range) || versions.stable;
};
