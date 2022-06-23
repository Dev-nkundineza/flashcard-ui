import { colors as SKColors } from '@apollo/space-kit/colors';
const breakpoints = [480, 768, 992, 1200];
export const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

export const colors = {
    primary: SKColors.indigo.base,
    secondary: SKColors.teal.base,
    accent: SKColors.pink.base,
    background: SKColors.silver.light,
    text: SKColors.black.base,
    textSecondary: SKColors.grey.dark,
    ...SKColors,
  };