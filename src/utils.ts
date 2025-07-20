export function createPageUrl(page) {
  return `/${page.toLowerCase()}`;  // This will create /inbox, /compose, etc.
}