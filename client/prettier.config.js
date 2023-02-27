/** @type {import("prettier").Config} */

module.exports = {
    printWidth: 120,
    tabWidth: 4,
    trailingComma: 'es5',
    semi: true,
    singleQuote: true,
    plugins: [require('prettier-plugin-tailwindcss')],
};