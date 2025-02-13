function extractJSON(str) {
  const match = str.match(/\{.*\}/s); // Matches everything between {}
  return match ? JSON.parse(match[0]) : null;
}

module.exports= extractJSON