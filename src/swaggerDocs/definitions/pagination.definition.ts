export default {
  PaginationSchema: {
    type: 'object',
    properties: {
      page: { type: 'number', example: 1 },
      totalItems: { type: 'number', example: 110 },
      perPage: { type: 'number', example: 10 },
      totalPages: { type: 'number', example: 11 },
    },
  },
};
