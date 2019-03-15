module.exports = {
    propsParser: require('react-docgen-typescript').withCustomConfig('./tsconfig.json', {
        propFilter: (props) => {
            return props.parent ? !props.parent.fileName.match('node_modules') : false;
        }
    }).parse,
    components: [
        'src/components/autocomplete-input/autocomplete-input.tsx',
        'src/components/autocomplete-input/data-provider.tsx.tsx',
        'src/components/backdrop/backdrop.tsx',
        'src/components/button/button.tsx',
        'src/components/button/buttons-group.tsx',
        'src/components/button/icon-button.tsx',
        'src/components/checkbox/checkbox.tsx',
        'src/components/divider/divider.tsx',
        'src/components/fade/fade.tsx',
        'src/components/flex-expander/flex-expander.tsx',
        'src/components/focus-trap/focus-trap.tsx',
        'src/components/form/form.tsx',
        'src/components/grow/grow.tsx',
        'src/components/hidden-scrollbar/hidden-scrollbar.tsx',
        'src/components/icon/icon.tsx',
        'src/components/input/input.tsx',
        'src/components/list/list.tsx',
        'src/components/list/list-item.tsx',
        'src/components/list/list-item-cell.tsx',
        'src/components/list/list-item-text.tsx',
        'src/components/menu/menu.tsx',
        'src/components/menu/menu-item.tsx',
        'src/components/menu/menu-item-cell.tsx',
        'src/components/menu/menu-item-text.tsx',
        'src/components/overlay/overlay.tsx',
        'src/components/paginator/paginator.tsx',
        'src/components/paper/paper.tsx',
        'src/components/popover/popover.tsx',
        'src/components/root-ref/root-ref.tsx',
        'src/components/select/select.tsx',
        'src/components/shake/shake.tsx',
        'src/components/textarea-autosize/textarea-autosize.tsx',
        'src/components/tooltip/tooltip.tsx',
        'src/components/typography/typography.tsx'
    ],
    getExampleFilename: (componentPath) => componentPath.replace(/\.tsx?$/, '.md'),
    require: ['@babel/polyfill']
};
