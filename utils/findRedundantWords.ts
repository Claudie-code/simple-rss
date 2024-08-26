import Parser from "rss-parser";

export function findRedundantKeywords(feed: Parser.Output<any>) {
  const wordCounts: { [key: string]: number } = {};
  const stopWords = new Set([
    "the",
    "and",
    "a",
    "to",
    "of",
    "in",
    "it",
    "is",
    "you",
    "that",
    "on",
    "for",
    "with",
    "as",
    "this",
    "by",
    "an",
    "be",
    "are",
    "was",
    "at",
    "from",
    "or",
    "have",
    "not",
    "but",
    "had",
    "they",
    "has",
    "which",
    "we",
    "will",
    "would",
    "can",
    "all",
    "there",
    "their",
    "if",
    "one",
    "about",
    "so",
    "what",
    "when",
    "who",
    "more",
    "out",
    "up",
    "them",
    "could",
    "into",
    "some",
    "any",
    "how",
    "do",
    "no",
    "my",
    "me",
  ]);

  // Parcourt chaque article dans le flux
  feed.items.forEach((item) => {
    const content = item.content.toLowerCase(); // Convertir en minuscule pour éviter les duplications dues à la casse
    const words: string[] | null = content.match(/\b\w+\b/g);

    if (words) {
      words.forEach((word) => {
        if (!stopWords.has(word)) {
          // Ignorer les mots courants
          wordCounts[word] = (wordCounts[word] || 0) + 1;
        }
      });
    }
  });

  // Trier les mots par fréquence d'apparition
  const sortedWords = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .map((entry) => entry[0]);

  return sortedWords;
}
