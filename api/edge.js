export const config = {
  runtime: 'edge',
};

export default (req) => {
  return new Response(`Hello, from ${req.url} I'm now an Edge Function!`);
};
