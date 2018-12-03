# Genestack Frontend UI Kit

## Development

To see UI kit demo run `npm start`.

## API Design Approach

This approach is based on [Material UI API Design Approach](https://material-ui.com/guides/api/).

### Composition

Using the `children` property is the idiomatic way to do composition with React.

```tsx
// Bad
<Menu
    items={[
      { title: 'Menu Item 1', onClick: () => console.log('clicked') }
    ]}
/>

// Good
<Menu>
    <MenuItem onClick={() => console.log('clicked')}>
        Menu Item 1
    </MenuItem>
</Menu>
```

Sometimes we only need limited child composition, for instance when we don't need to allow child to order permutations. In this case, providing explicit properties makes the implementation simpler and more performant.

```tsx
// just example of abstract `Tab` that could have `icon` and `label`
// in this case children are redundant because `Tab` can have only single `icon`
// and single `label`
<Tab>
    <TabIcon><AddIcon /></TabIcon>
    <TabLabel>Add</TabLabel>
</Tab>

// right variant
<Tab
    icon={<AddIcon />}
    label="Add"
/>
```


### Spread props

Any component should spread its props to element it renders.
There are few common types of elements that any component could render:

- the root element
- the target element
- additional elements

Any component that renders elements has a single `root` element.
In common cases the `root` element is the `target` element.
Any element that is not the `root` or the `target` is an `additional` element.
Main purpose of the `root` element is CSS. The `target` element is used for API purposes.

So `className` and `style` props should always be passed to the `root` component.
Other props are passed to the `target` component.

```tsx
// root == target
interface TabProps extends React.HTMLAttributes<HTMLDivElement> {
    icon: React.ReactNode;
    label: React.ReactNode;
}

function Tab(props: TabProps) {
    const { icon, label, ...rootProps } = props;
    return (
        <div {...rootProps} className={cn(rootProps.className, 'gs-tab')}>
            {/* additional element `icon` */}
            <div className="gs-tab-icon">{icon}</div>
            {/* additional element `label` */}
            <div className="gs-tab-icon">{label}</div>
        </div>
    );
}

// root = div
// target = input
interface InputProps extends React.HTMLAttributes<HTMLInputElement> {}

function Input(props: InputProps) {
    const { className, style, ...targetProps } = props;
    return (
        <div className={cn(className, 'gs-input-root')} style={style}>
            <input
                {...targetProps}
                className={cn(targetProps.className, 'gs-input')}
            />
        </div>
    );
}
```

### Ref props

Do not use `React.forwardRef` for functional components. Use `{specific}Ref` prop instead. Also use only `React.RefObject` (peer dep: `react: ">= 16.3 < 17"`)

```tsx
interface Props {
  inputRef: React.RefObject<HTMLInputElement>;
}

function Input(props: Props) {
  return <input ref={props.inputRef} />
}
```

In React `ref` could use `React.ReactInstance` or `HTMLElement`. The common rule is that if we use `html` component like `<input/>` or `<button />` we get `HTMLElement` in `ref`. But if we pass ref to custom React component like `<Input />` or `<Button />` we get `ReactInstance` or nothing if the component is function. Moreover if in the future a functional component is updated to a class component, its `API` will get a breaking change.

```tsx
// this is a functional component
<Input ref={(node: HTMLElement) => {}} />

// but now it is a class component
<Input ref={(node: Input => {})} />
```

If we use `inputRef`, this problem is gone:

```tsx
// this is a functional component
<Input inputRef={(node: HTMLElement) => {}} />

// but now it is a class component
<Input inputRef={(node: HTMLElement => {})} />
```

Use `rootRef` for the `root` element and semantic name for the `target` element (ex: `inputRef`) if it is not the `root`. If you'd like to allow access to `additional` elements through refs, use semantic names as well (ex. `labelRef` or `iconRef` for `Tab` component).

```tsx
interface TabProps extends React.HTMLAttributes<HTMLDivElement> {
    rootRef?: React.RefObject<HTMLDivElement>;
    iconRef?: React.RefObject<HTMLDivElement>;
    labelRef?: React.RefObject<HTMLDivElement>;
}

function Tab(props: TabProps) {
    const { rootRef, iconRef, labelRef, ...rootProps } = props;
    return (
        <div ref={rootRef}>
            <div ref={iconRef} />
            <div ref={labelRef} />
        </div>
    );
}

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
    rootRef?: React.RefObject<HTMLDivElement>;
    inputRef?: React.RefObject<HTMLInputElement>;
}

function Input(props: InputProps) {
    const { rootRef, inputRef } = props;
    return (
        <div ref={rootRef}>
            <input ref={inputRef} />
        </div>
    );
}
```

### Elements props

In some cases you can provide access to any `additional` or `non-target root` props for more flexible API.
In this cases you should define `{additional}Props` for additional elements (ex. `labelProps` and `iconProps` for `Tab`)
and `rootProps` for the `root` element if it is not the `target` element.

```tsx
interface TabProps extends React.HTMLAttributes<HTMLDivElement> {
    iconProps?: React.HTMLAttributes<HTMLDivElement>;
    labelProps?: React.HTMLAttributes<HTMLDivElement>;
}

function Tab(props: TabProps) {
    const { iconProps, labelProps, ...rootProps } = props;
    return (
        <div {...rootProps}>
            <div {...iconProps} />
            <div {...labelProps} />
        </div>
    );
}

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
    rootProps?: React.HTMLAttributes<HTMLDivElement>;
}

function Input(props: InputProps) {
    const { rootProps, ...targetProps } = props;
    return (
        <div {...rootProps}>
            <input {...targetProps} />
        </div>
    );
}
```

Do not use `targetRef` or `targetProps` because `targetProps` is always a part of whole props of component and `targetRef` is not semantic enough.

See also Material UI Approach sections:
 - [Nested Components](https://material-ui.com/guides/api/#nested-components)
 - [Controlled components](https://material-ui.com/guides/api/#property-naming)
 - [boolean vs enum](https://material-ui.com/guides/api/#boolean-vs-enum)

### ClassNames

For more flexible customization of components look we should expose posibility
to add any `className` or state's `className` of any nested components.
For this purposes `classes` propery and `mergeClassesProps` util
are being used in components.

```css
/* tab.module.css */
.root { /*...*/ }
.icon { /*...*/ }
.label { /*...*/ }
.disabled { /*...*/ }
```

```tsx
// tab.tsx
import styles from './tab.module.css';
import { mergeClassesProps, WithClasses } from '../../utils/styles';

type ClassKeys = 'root' | 'icon' | 'label' | 'disabled';

interface TabProps extends WithStyles<ClassKeys> {
    disabled?: boolean;
}

function Tab(props: TabProps) {
    const { classes, style, disabled } = mergeClassesProps(props, styles);

    const rootClassName = cn(classes.root, {
        [classes.disabled]: disabled,
    });

    const iconClassName = classes.icon;
    const labelClassName = classes.label;

    return (
        <div className={rootClassName} style={style}>
            <div className={iconClassName} />
            <div className={labelClassName} />
        </div>
    )
}
```

Note that the `className` prop is always merged to `classes.root` and removed from original `props`;
The `mergePropsWithClasses` always returns a `props` object extended with `classes` and `classes.root` properties.
`WithStyles` interface add `className` and `classes` properties to component's props.

After that we can use `Tab` component like this:

```css
.mainTab { /* ... */ }
.mainTabDisabled { /* ... */ }
```

```tsx
import { ClassNamesMap } from '../../utils/style';
import { Tab } from './components/tab';
import _styles from './page.module.css';

// you also can use `ClassNamesMap` from utils to type your styles
const styles = _styles as ClassNamesMap<'mainTab' | 'mainTabDisabled'>;

function MainPage() {
    return (
        <Header>
            <PageTabs>
                <Tab
                    className={styles.mainTab}
                    classes={{ disabled: styles.mainTabDisabled }}
                    label="Tab With Extended Styles"
                />
            </PageTabs>
        </Header>
    );
}
```

### Prefer `interface` to `type` in TypeScript defenitions

`[Type A] & [Type B]` is not extending but merging types. Components mostly **extend** or **replace** other component props.

```ts
// the next line is valid for TS compiler
// in the result the final type will be { foo: number & string }
type A = { foo: string } & { foo: number };

// the next line throws TS error
// because `number` does not satisfy `number & string`
const a: A = {
    foo: 1, // in this place TS
};
```

Using interfaces we get an error of types incompatibility on the defenition stage, not on the using stage:

```ts
interface A {
  foo: string;
}

// [ts] Interface 'B' incorrectly extends interface 'A'
interface B extends A {
  foo: number;
}

// to replace some property use `Omit` helper from utils
interface B extends Omit<A, 'foo'> {
  foo: number;
}
```

### Pure components

Avoid using `PureComponent` since optimization is mostly application-specific task.

### Type defenitions at the top

Declare component's `Props` and `State` interfaces at the top of component's file.
First of all we check which component API has and only then how it works.
