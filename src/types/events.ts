export const EVENT_NAMES = {
  COLOR_SELECTED: "product:color:selected",
  THUMB_CLICKED: "product:thumb:clicked",
} as const;

export type ProductGalleryEvent =
  | {
      type: typeof EVENT_NAMES.COLOR_SELECTED;
      color: string;
    }
  | {
      type: typeof EVENT_NAMES.THUMB_CLICKED;
      index: number;
    };

export function dispatchProductGalleryEvent<T extends ProductGalleryEvent>(
  event: T,
): void {
  const customEvent = new CustomEvent<T>(event.type, { detail: event });
  document.dispatchEvent(customEvent);
}

export function onProductGalleryEvent<T extends ProductGalleryEvent>(
  type: T["type"],
  handler: (event: CustomEvent<T>) => void,
): () => void {
  const listener = (e: Event) => {
    if (e instanceof CustomEvent) {
      handler(e);
    }
  };

  document.addEventListener(type, listener);

  return () => document.removeEventListener(type, listener);
}
