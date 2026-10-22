// Detail pages list a story's figures and videos before its text, so on wide
// screens they float into the right column starting at the top. Each block
// keeps its original position as a flex `order`, which narrow screens use to
// show the story in sequence again.
export function mediaFirst<T extends { type: string }>(blocks: T[]): { block: T; index: number }[] {
  const indexed = blocks.map((block, index) => ({ block, index }));
  const isText = (block: T) => block.type === 'paragraph' || block.type === 'heading';
  return [
    ...indexed.filter(({ block }) => !isText(block)),
    ...indexed.filter(({ block }) => isText(block)),
  ];
}
