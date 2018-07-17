
export const mreplace = (arr, x) => arr.reduce((s, [re, sub]) => s.replace(re, sub), x)
