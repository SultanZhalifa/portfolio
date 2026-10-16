// Shared by the app and scripts/share-pages.mjs, so both agree on every case study's address.
export const slugOf = (project) =>
  project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
