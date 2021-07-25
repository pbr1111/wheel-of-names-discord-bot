const easeOutQuad = (t: number, b: number, c: number, d: number): number =>
  -c * ((t = t / d - 1) * t * t * t - 1) + b;

export { easeOutQuad };
