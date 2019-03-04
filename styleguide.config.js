module.exports = {
    propsParser: require('react-docgen-typescript').withCustomConfig('./tsconfig.json', {}).parse,
    components: 'src/components/**/*.tsx',
    require: ['@babel/polyfill']
};
