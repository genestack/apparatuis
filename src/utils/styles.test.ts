import { createClassNamesMerger } from './styles';

const sortClassNames = (str: string) => str.split(' ').sort().join(' ');

describe('class names merger', () => {
    const mergePropsWithClasses = createClassNamesMerger({
        'root': '_root',
        'comp': '_comp',
    });

    const props = mergePropsWithClasses({
        someProp: true,
        className: '__className',
        classes: {
            'root': '__root',
            'comp': '__comp',
            'any': '__any',
        },
    });

    it('props should have valid keys', () => {
        expect(props).toHaveProperty('someProp');
        expect(props).toHaveProperty('className');
        expect(props).toHaveProperty('classes');
    });

    it('props.classes should contain valid keys', () => {
        expect(props.classes).toHaveProperty('root');
        expect(props.classes).toHaveProperty('comp');
        expect(props.classes).not.toHaveProperty('any');
    });

    it('props.classes should have valid values', () => {
        expect(sortClassNames(props.classes.root)).toEqual(sortClassNames('_root __root __className'));
        expect(sortClassNames(props.classes.comp)).toEqual(sortClassNames('_comp __comp'));
    });

    it('root className should contain props.className', () => {
        expect(props.classes.root).toMatch(/\b__className\b/);
    });
});

describe('class names merger should always create root className', () => {
    it('props.classes.root should not have value without props.className', () => {
        const mergePropsWithClasses = createClassNamesMerger({});
        const props = mergePropsWithClasses({});
        expect(props.classes.root).toEqual('');
    });

    it('props.classes.root should not have props.className value', () => {
        const mergePropsWithClasses = createClassNamesMerger({});
        const props = mergePropsWithClasses({ className: '__root' });
        expect(props.classes.root).toEqual('__root');
    });
});
