export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

/**
 * Returns the asset path prefixed with the base path when deployed on subpath hosts (e.g. GitHub Pages).
 * Ensures assets load correctly on both local dev (root '/') and GitHub Pages ('/Portfolio/').
 */
export function getAssetPath(path: string): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (BASE_PATH && cleanPath.startsWith(BASE_PATH)) {
    return cleanPath;
  }

  return `${BASE_PATH}${cleanPath}`;
}
