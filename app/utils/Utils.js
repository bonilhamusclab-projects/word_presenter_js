import u from 'underscore'

export const repeatArray = (arr, num_repeats) => u.chain(num_repeats)
  .range()
  .map(i => arr)
  .flatten()
  .value()

export const timeDiffToMs = time_diff => {
  const [seconds, nanos] = time_diff
  return seconds*1000 + nanos/1000000
}
