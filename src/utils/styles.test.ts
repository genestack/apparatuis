import { mergeClassesProps } from './styles';

const sortClassNames = (str: string) => str.split(' ').sort().join(' ');

describe('result of calling mergeClassesProps', () => {
    describe('in common case', () => {
        const mergeClassesSample = () => mergeClassesProps({
            someProp: true,
            className: '__className',
            classes: {
                'root': '__root',
                'comp': '__comp',
                'any': '__any',
            },
        }, {
            'root': '_root',
            'comp': '_comp',
        });

        it('should have valid keys', () => {
            const props = mergeClassesSample();
            expect(props).toHaveProperty('someProp');
            expect(props).not.toHaveProperty('className');
            expect(props).toHaveProperty('classes');
        });

        it('should have classes property with valid keys', () => {
            const props = mergeClassesSample();
            expect(props.classes).toHaveProperty('root');
            expect(props.classes).toHaveProperty('comp');
            expect(props.classes).not.toHaveProperty('any');
        });

        it('should have classes property with valid values', () => {
            const props = mergeClassesSample();
            expect(sortClassNames(props.classes.root)).toEqual(sortClassNames('_root __root __className'));
            expect(sortClassNames(props.classes.comp)).toEqual(sortClassNames('_comp __comp'));
        });

        it('should have classes.root property which equals main className', () => {
            const props = mergeClassesSample();
            expect(props.classes.root).toMatch(/\b__className\b/);
        });
    });

    it('should have classes.root property which equals empty string when className property is omited', () => {
        const props = mergeClassesProps({}, {});
        expect(props.classes.root).toEqual('');
    });

    it('should have classes.root property which equals className property when classes property is omited', () => {
        const props = mergeClassesProps({ className: '__root' }, {});
        expect(props.classes.root).toEqual('__root');
    });
});
