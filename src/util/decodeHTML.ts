const decodeHTML = (text: string) => {
  if (window.DOMParser) {
    const str = new DOMParser().parseFromString(text, "text/html");
    return str.documentElement.textContent;
  }
  return null;
};

export default decodeHTML;
