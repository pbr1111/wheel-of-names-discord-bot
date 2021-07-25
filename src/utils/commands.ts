const parseArgsAsCsv = (args: string[]) =>
  args
    ?.join(' ')
    ?.split(',')
    .reduce((acc, name) => {
      const trimmedName = name.trim();
      if (trimmedName) {
        acc.push(trimmedName);
      }
      return acc;
    }, [] as string[]);

export { parseArgsAsCsv };
