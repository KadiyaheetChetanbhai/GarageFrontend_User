import { showErrorToast } from "./toast";

export function formatDate(date) {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    showErrorToast("Invalid date provided");
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${month}-${day}-${year}`;
}

export function dateToISODate(date) {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    showErrorToast("Invalid date provided");
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatPriceRange(priceRange) {
  if (!priceRange) return "";
  if (typeof priceRange === "string") return priceRange;
  const { start, end } = priceRange;
  if (start != null && end != null) return `$${start} - $${end}`;
  if (start != null) return `From $${start}`;
  if (end != null) return `Up to $${end}`;
  return "";
}

export function cleanParams(params) {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) =>
        value !== undefined &&
        value !== "any" &&
        value !== "" &&
        (Array.isArray(value) ? value.some((v) => v !== null) : value !== null)
    )
  );
}

// Helper function to parse the HTML content from CMS API into sections
export function parseHtmlContent(htmlContent) {
  if (!htmlContent) return [];

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;

  const sections = [];
  let currentId = 1;

  // Look for both h2 and h3 elements
  const headingElements = tempDiv.querySelectorAll("h2, h3");

  if (headingElements.length > 0) {
    headingElements.forEach((heading) => {
      const title = heading.textContent.trim();
      let content = [];

      let currentNode = heading.nextSibling;
      while (currentNode && !isHeadingElement(currentNode)) {
        if (currentNode.nodeName === "P") {
          const text = currentNode.textContent.trim();
          if (text) content.push(text);
        } else if (
          currentNode.nodeName === "UL" ||
          currentNode.nodeName === "OL"
        ) {
          const listItems = currentNode.querySelectorAll("li");
          content.push(
            ...Array.from(listItems).map((li) => li.textContent.trim())
          );
        }
        currentNode = currentNode.nextSibling;
      }

      sections.push({
        id: currentId++,
        title,
        content: content.length === 1 ? content[0] : content,
      });
    });
  } else {
    // Fallback: just extract all non-empty <p> content
    const paragraphs = tempDiv.querySelectorAll("p");
    const content = Array.from(paragraphs)
      .map((p) => p.textContent.trim())
      .filter((text) => text);

    if (content.length) {
      sections.push({
        id: currentId,
        title: "General",
        content: content.length === 1 ? content[0] : content,
      });
    }
  }

  return sections;
}

// Helper function to check if a node is a heading element
function isHeadingElement(node) {
  return (
    node &&
    node.nodeName &&
    ["H1", "H2", "H3", "H4", "H5", "H6"].includes(node.nodeName)
  );
}
