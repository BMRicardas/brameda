import {
  documentToHtmlString,
  type Options,
} from "@contentful/rich-text-html-renderer";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { BLOCKS, type Document } from "@contentful/rich-text-types";

const options: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, next) => {
      const isEmptyLine =
        // @ts-expect-error
        node.content.length === 1 && node.content[0]?.value === "";

      if (isEmptyLine) {
        return `<br/>`;
      } else {
        return `<p>${next(node.content)}</p>`;
      }
    },
  },
};

export function renderRichTextToHtml(doc: Document) {
  return documentToHtmlString(doc, options);
}

export function renderRichTextToPlainText(doc: Document, limit?: number) {
  const text = documentToPlainTextString(doc);
  if (!limit) return text;
  return text.length > limit ? `${text.slice(0, limit).trim()}…` : text;
}
