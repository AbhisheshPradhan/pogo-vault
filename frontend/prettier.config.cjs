/** @type {import('prettier').Config} */
module.exports = {
    // 1. Mandatory: Include the Tailwind CSS plugin for class sorting
    plugins: ['prettier-plugin-tailwindcss'],

    // 2. Specify the parser for TypeScript files
    // This is crucial for Prettier to correctly handle TypeScript syntax,
    // including the JSX within your .tsx files.
    parser: 'typescript',

    // 3. Common formatting rules for React/TypeScript projects
    semi: true,
    trailingComma: 'all',
    singleQuote: true,
    printWidth: 80,
    tabWidth: 4,
};
