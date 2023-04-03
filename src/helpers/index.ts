import parse from "html-react-parser";

const htmlParser = (data: any) => {
  return data.replace(/<[^>]*>?/gm, "");
};

const stringToHTML = (str: string) => {
  return parse(str);
};

export { htmlParser, stringToHTML };
