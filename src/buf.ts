/**
 * Returns a buffer object
 * The buffer contains an array of length n and a counter
 * The array can be initialized with the second argument
 * Pushing an element to the buffer appends it to the array
 * and removes the first element, effectively shifting the array
 * This also increments a counter
 * Flush sets all elements of the array to a value and clears the counter
 * Update will push an element to the buffer every n ms

var b = ben.buf(10, 0);
// b.buffer = [0,0,0,0,0,0,0,0,0,0]
// b.count = 0

b.push(2);
// b.buffer = [0,0,0,0,0,0,0,0,0,2]
// b.count = 1

b.push(4);
// b.buffer = [0,0,0,0,0,0,0,0,2,4]
// b.count = 2

b.flush('e')
// b.buffer = ['e','e','e','e','e','e','e','e','e','e']
// b.count = 0
*/
export function buf(n: number, e: any) {
  let t: ReturnType<typeof setInterval>;
  const out = {
    buffer: new Array(n),
    count: 0,
    push(el: any) {
      this.buffer.push(el);
      this.buffer.shift();
      this.count += 1;
    },
    flush(el: any) {
      this.buffer.fill(el);
      this.count = 0;
    },
    update(ms: number, el: any) {
      clearInterval(t);
      t = setInterval(() => {
        out.push(el);
      }, ms);
    },
  };
  if (e !== undefined) { out.flush(e); }
  return out;
};


