export function getURLParams(value: string, param: string): string | null {
  if (!value) return null;

  const url = new URL(value);
  const params = new URLSearchParams(url.search);

  return params.get(param);
}
