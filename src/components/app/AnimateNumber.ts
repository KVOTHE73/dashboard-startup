function countDecimals(x: number): number {
  const split = x.toString().split(".");
  return split[1] ? split[1].length : 0;
}

function formatNumber(
  value: number,
  locale: string,
  style: "currency" | "decimal" = "decimal"
): string {
  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  if (style === "currency") {
    options.style = "currency";
    options.currency = locale === "es" ? "EUR" : "USD";
  } else {
    options.style = "decimal";
  }

  return new Intl.NumberFormat(locale, options).format(value);
}

export function animateNumber(locale: string) {
  const elms = [].slice.call(document.querySelectorAll("[data-animation]"));
  elms.forEach((elm: HTMLElement) => {
    const targetAnimate = elm.getAttribute("data-animation");
    const targetValueAttr = elm.getAttribute("data-value");
    const targetFormat = elm.getAttribute("data-format") || "decimal"; // por defecto decimal

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
        const decimal = countDecimals(targetValue);
        const value = targetValue;
        const time = value / 300;
        const animate = () => {
          const data = +(elm.dataset.count || "0");
          if (data < value) {
            const targetText = data + time;
            elm.innerText = formatNumber(
              +targetText.toFixed(decimal),
              locale,
              targetFormat as "currency" | "decimal"
            );
            elm.dataset.count = targetText.toString();
            setTimeout(animate, 1);
          } else {
            elm.innerText = formatNumber(
              value,
              locale,
              targetFormat as "currency" | "decimal"
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
