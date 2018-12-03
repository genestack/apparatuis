import { mergeClassesProps } from './styles';

const sortClassNames = (str: string) => str.split(' ').sort().join(' ');

describe('class names merger', () => {
    const moduleClassNames = {
        'root': '_root',
        'comp': '_comp',
    };

    const props = mergeClassesProps({
        someProp: true,
        className: '__className',
        classes: {
            'root': '__root',
            'comp': '__comp',
            'any': '__any',
        },
    }, moduleClassNames);

    it('props should have valid keys', () => {
        expect(props).toHaveProperty('someProp');
        expect(props).not.toHaveProperty('className');
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
        const props = mergeClassesProps({}, {});
        expect(props.classes.root).toEqual('');
    });

    it('props.classes.root should not have props.className value', () => {
        const props = mergeClassesProps({ className: '__root' }, {});
        expect(props.classes.root).toEqual('__root');
    });
});
