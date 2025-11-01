import next from 'eslint-config-next';
import tseslint from 'typescript-eslint';
const config = [
    { ignores: ['node_modules', '.next', 'out', 'dist', 'coverage'] },
    ...next,
    ...tseslint.configs.recommendedTypeChecked,
    {
        files: ['src/**/*.{ts,tsx}'],
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        }
    },
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'error',
            'import/no-default-export': 'error',
            'no-restricted-syntax': [
                'error',
                { selector: 'ImportNamespaceSpecifier', message: 'Avoid namespace imports; import named members instead.' }
            ],
            'no-restricted-imports': ['error', { patterns: ['../../*', '../../../*'] }],
            'eqeqeq': ['error', 'always'],
            'no-console': 'warn',
        },
    },
];

export default config;