export const getNextId = (items: { id: number }[]) => Math.max(...items.map((x) => x.id)) + 1;
