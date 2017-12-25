const escapeCharsRegexp = /[|\\{}()[\]^$+*?.]/g;

const escape = function(str) {
  return str.replace(escapeCharsRegexp, '\\$&');
};

// Create a new spin function using given
const factory = function(openMarker, closeMarker, delimiter) {
  // Precompile regexp
  const regexp = new RegExp(
    `${escape(openMarker)}([^${escape(openMarker)}${escape(
      closeMarker
    )}]*)${escape(closeMarker)}`,
    'g'
  );

  // Keep track of spin tags length (used in match.substring in spin function)
  const openLength = openMarker.length;
  const closeLength = closeMarker.length;

  let spin = function(str) {
    let matches = str.match(regexp);

    if (!matches) {
      return str;
    }

    let match;
    let alternatives;

    const length = matches.length;

    // Loop on every match
    for (let i = 0; i < length; i += 1) {
      match = matches[i].toString();
      alternatives = match
        .substring(openLength, match.length - closeLength)
        .split(delimiter);
      str = str.replace(
        match,
        alternatives[Math.floor(Math.random() * alternatives.length)]
      );
    }

    // Run spin recursively to solve outer matches
    return spin(str);
  };

  spin.factory = factory;

  return spin;
};

module.exports = factory('{', '}', '|');
module.exports.factory = factory;
