export const mapElements = (element, object) => {
  const elements = {};

  Object.keys(object).forEach((key) => {
    const entry = object[key];

    if (
      entry instanceof HTMLElement ||
      entry instanceof NodeList ||
      Array.isArray(entry)
    ) {
      elements[key] = entry;
    } else {
      elements[key] = element.querySelectorAll(entry);

      if (elements[key].length === 0) {
        elements[key] = null;
      } else if (elements[key].length === 1) {
        elements[key] = element.querySelector(entry);
      }
    }
  });

  return elements;
};
