module.exports =
  ({ schema }) =>
    (data) =>
      schema.validate(data);
