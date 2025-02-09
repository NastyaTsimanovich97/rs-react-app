const MAX_TEXT_LENGTH = 300;

export function spliceDescription(text: string): string {
  if (text.length < MAX_TEXT_LENGTH) return text;
  else return `${text.slice(0, MAX_TEXT_LENGTH)}...`;
}
