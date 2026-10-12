// Screenshot path for a project: an explicit `image`, or /previews/<github-repo-name>.webp.
// `screenshot: false` means there is no real screenshot yet, so show none.
export const previewOf = (project) => {
  if (project.screenshot === false) return null;
  return project.image || (project.github ? `/previews/${project.github.split('/').pop().toLowerCase()}.webp` : null);
};
