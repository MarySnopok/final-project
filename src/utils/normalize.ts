export function normalize<ID extends string | number, T extends { id: ID }, D = T>(
  items: T[],
  each?: (item: T) => D,
): {
  result: ID[];
  data: Record<ID, D>;
} {
  const result = [] as ID[];
  const data = {} as Record<ID, D>;

  for (const item of items) {
    const id = item.id;
    result.push(id);
    data[id] = each ? each(item) : item as any;
  }

  return {
    result,
    data,
  };
}
