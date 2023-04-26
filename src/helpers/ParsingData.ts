import parse from "html-react-parser";

const htmlParser = (data: any) => {
  return data.replace(/<[^>]*>?/gm, "");
};

const stringToHTML = (str: string) => {
  return parse(str);
};

function convertDigitEntoArabic(input: string): string {
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  let output = "";
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const charIndex = arabicDigits.indexOf(char);
    if (charIndex !== -1) {
      output += charIndex;
    } else {
      output += char;
    }
  }
  return output;
}

const ConvertToArabicNumbers = (num: number) => {
  const arabicNumbers =
    "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
  return new String(num).replace(/[0123456789]/g, (d: any) => {
    return arabicNumbers[d];
  });
};

export {
  htmlParser,
  stringToHTML,
  convertDigitEntoArabic,
  ConvertToArabicNumbers,
};
