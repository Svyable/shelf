// Bound the entire acquisition, including body consumption. A stalled response
// must not hold the serial route queue forever. Abort also releases network work.
export async function requestWithDeadline(url, options = {}, consume = (response) => response, timeoutMs = 15000) {
  const controller = new AbortController();
  let timer;
  const deadline = new Promise((_, reject) => {
    timer = setTimeout(() => {
      const error = new Error(`Request timed out: ${url}`);
      error.name = 'TimeoutError';
      reject(error);
      controller.abort();
    }, timeoutMs);
  });
  try {
    return await Promise.race([
      Promise.resolve().then(() => fetch(url, { ...options, signal: controller.signal })).then(consume),
      deadline,
    ]);
  } finally {
    clearTimeout(timer);
  }
}
