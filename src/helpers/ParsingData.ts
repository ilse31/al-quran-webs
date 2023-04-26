import parse from "html-react-parser";

const htmlParser = (data: any) => {
  return data.replace(/<[^>]*>?/gm, "");
};

const stringToHTML = (str: string) => {
  return parse(str);
};

const ConvertToArabicNumbers = (num: number) => {
  const arabicNumbers =
    "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
  return new String(num).replace(/[0123456789]/g, (d: any) => {
    return arabicNumbers[d];
  });
};

export { htmlParser, stringToHTML, ConvertToArabicNumbers };
