export const getPaginationData = (
  paginationMetadata: string
): MessagesPaginationMetadata => {
  return JSON.parse(paginationMetadata);
};
