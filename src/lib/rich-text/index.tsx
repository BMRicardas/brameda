import {
  documentToHtmlString,
  type Options,
} from "@contentful/rich-text-html-renderer";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { BLOCKS, type Document, helpers } from "@contentful/rich-text-types";

const options = {
  preserveWhitespace: true,
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, next) => {
      const textContent = node.content
        .flatMap((child) => (helpers.isText(child) ? [child.value] : []))
        .join("");

      if (!textContent.trim()) {
        return "<br>";
      }

      return `<p>${next(node.content).replace(/\n/g, "<br>")}</p>`;
    },
  },
} satisfies Options;

export function renderRichTextToHtml(doc: Document) {
  return documentToHtmlString(doc, options);
}

export function renderRichTextToPlainText(doc: Document, limit?: number) {
  const text = documentToPlainTextString(doc);
  if (!limit) return text;
  return text.length > limit ? `${text.slice(0, limit).trim()}…` : text;
}
