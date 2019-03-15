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
    require: ['@babel/polyfill']
};
