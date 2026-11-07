import { createCn } from "cn/config"

/**
 * Class merger that knows SPARK's custom tokens, so that e.g.
 * `cn("text-body", "text-paper")` keeps BOTH classes (size + colour)
 * instead of treating `text-body` as a colour and dropping it. Same for
 * `bg-graphite bg-grid`: the grid is a background image, not a colour.
 */
export const cn = createCn({
  extend: {
    classGroups: {
      "bg-image": [{ bg: ["grid"] }],
      "font-size": [
        {
          text: [
            "micro",
            "caption",
            "body",
            "lead",
            "title",
            "heading",
            "headline",
            "display",
            "mega",
          ],
        },
      ],
      duration: [
        { duration: ["press", "fast", "base", "slow", "spark", "draw"] },
      ],
      shadow: [{ shadow: ["raised", "overlay", "modal", "paper", "line"] }],
    },
  },
})
