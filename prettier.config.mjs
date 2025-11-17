export default {
  // Match the desired width (line 9 ≈ 74 chars)
  printWidth: 74,
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  bracketSpacing: true,
  bracketSameLine: false,
  // Improves readability of long prop lists in TSX/JSX
  singleAttributePerLine: true,
  // Sort Tailwind class names consistently
  plugins: ["prettier-plugin-tailwindcss"],
};
