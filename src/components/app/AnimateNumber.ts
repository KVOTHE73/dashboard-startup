function countDecimals(x: number): number {
  const split = x.toString().split(".");
  return split[1] ? split[1].length : 0;
}

function formatNumber(
  value: number,
  locale: string,
  style: "currency" | "decimal" | "integer" = "decimal"
): string {
  const options: Intl.NumberFormatOptions = {};

  if (style === "currency") {
    options.style = "currency";
    options.currency = locale === "es" ? "EUR" : "USD";
    options.minimumFractionDigits = 2;
    options.maximumFractionDigits = 2;
  } else if (style === "integer") {
    options.style = "decimal";
    options.minimumFractionDigits = 0;
    options.maximumFractionDigits = 0;
  } else {
    options.style = "decimal";
    options.minimumFractionDigits = 2;
    options.maximumFractionDigits = 2;
  }

  return new Intl.NumberFormat(locale, options).format(value);
}

export function animateNumber(locale: string) {
  const elms = [].slice.call(document.querySelectorAll("[data-animation]"));
  elms.forEach((elm: HTMLElement) => {
    const targetAnimate = elm.getAttribute("data-animation");
    const targetValueAttr = elm.getAttribute("data-value");
    const targetFormat = elm.getAttribute("data-format") || "decimal";

    if (!targetAnimate || !targetValueAttr) return;

    switch (targetAnimate) {
      case "width":
        setTimeout(() => {
          elm.style.width = targetValueAttr;
        }, 250);
        break;
      case "height":
        setTimeout(() => {
          elm.style.height = targetValueAttr;
        }, 250);
        break;
      case "number":
        const targetValue = +targetValueAttr.replace(",", ".");
        const decimal =
          targetFormat === "integer" ? 0 : countDecimals(targetValue);
        const value = targetValue;
        const time = value / 300;
        const animate = () => {
          const data = +(elm.dataset.count || "0");
          if (data < value) {
            const targetText = data + time;
            elm.innerText = formatNumber(
              +targetText.toFixed(decimal),
              locale,
              targetFormat as "currency" | "decimal" | "integer"
            );
            elm.dataset.count = targetText.toString();
            setTimeout(animate, 1);
          } else {
            elm.innerText = formatNumber(
              value,
              locale,
              targetFormat as "currency" | "decimal" | "integer"
            );
          }
        };
        animate();
        break;
      case "class":
        elm.classList.add(targetValueAttr);
        break;
    }
  });
}
