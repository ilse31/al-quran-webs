const htmlParser = (data: any) => {
  return data.replace(/<[^>]*>?/gm, "");
};

export { htmlParser };
