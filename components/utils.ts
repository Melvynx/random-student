export const parseUrlQuery = (value: string) => {
  const urlParams = new URL(value).searchParams;
  return Array.from(urlParams.keys()).reduce(
    (acc: Record<string, string>, key: string) => {
      acc[key] = urlParams.getAll(key)[0];
      return acc;
    },
    {}
  );
};
