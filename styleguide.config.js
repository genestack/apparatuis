const path = require('path');

const kebabToCamelCase = (str) =>
    str
        .split('-')
        .map((s) => s[0].toUpperCase() + s.slice(1))
        .join('');

module.exports = {
    propsParser: require('react-docgen-typescript').withCustomConfig('./tsconfig.json', {
        propFilter: (props) => {
            return props.parent ? !props.parent.fileName.match('node_modules') : false;
        }
    }).parse,
    components: ['src/components/**/*.tsx'],
    ignore: [
        '**/*.test.tsx',
        '**/index.tsx',
        'src/components/autocomplete-input/downshift-issue-512-fix.tsx'
    ],
    getExampleFilename: (componentPath) => componentPath.replace(/\.tsx?$/, '.md'),
    require: ['@babel/polyfill'],
    getComponentPathLine: (componentPath) => {
        const name = kebabToCamelCase(path.basename(componentPath, '.tsx'));
        const dir = path.dirname(componentPath).replace(/^src/, 'genestack-ui');
        return `import {${name}} from '${dir}';`;
    },
    styles: {
        Playground: {
            preview: {
                background: 'rgb(227,227,227)'
            }
        }
    }
};
