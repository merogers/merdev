export const handleHealthCheck = async (_req, res, next) => {
  try {
    return res.sendStatus(200);
  } catch (error) {
    next(error);
    return null;
  }
};
