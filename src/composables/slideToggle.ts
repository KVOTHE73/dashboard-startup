import { slideUp } from "@/composables/slideUp.ts";
import { slideDown } from "@/composables/slideDown.ts";

export function slideToggle(elm: HTMLElement, duration: number = 300): void {
  if (window.getComputedStyle(elm).display === "none") {
    slideDown(elm, duration);
  } else {
    slideUp(elm, duration);
  }
}
