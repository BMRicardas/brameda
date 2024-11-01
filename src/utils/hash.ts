export function generateHash(content: unknown): string {
  if (typeof content !== "object" || content === null) {
    return String(content);
  }

  const str = JSON.stringify(content, (_, value) => {
    if (typeof value === "object" && value !== null) {
      return Object.keys(value)
        .sort()
        .reduce((result: Record<string, unknown>, key) => {
          result[key] = value[key];
          return result;
        }, {});
    }
    return value;
  });

  // Simple hash function
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}
