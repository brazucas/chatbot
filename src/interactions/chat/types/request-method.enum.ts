const RequestMethodDef = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

type RequestMethod = typeof RequestMethodDef[keyof typeof RequestMethodDef];

export default RequestMethod;
