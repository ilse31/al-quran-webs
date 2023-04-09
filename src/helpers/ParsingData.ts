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

export { htmlParser, stringToHTML, convertDigitEntoArabic };
