<!--
   Copyright (c) 2011-2018 Genestack Limited
   All Rights Reserved
   THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
   The copyright notice above does not evidence any
   actual or intended publication of such source code.
-->

# Genestack Frontend UI Kit

## Development

To see UI kit demo run `npm start`.

## API Design Approach

This approach is based on [Material UI API Design Approach](https://material-ui.com/guides/api/).

### Composition

Use children property to populate main area/slot of the component.
Component has its main area when the base abstraction it provides could be considered as a "wrapper", i.e. element,
which main purpose is to decorate its content and the content of the element is something user really cares about.
Good examples could be a `Dialog`, a `TableCell` or `Menu`.

```tsx
<Menu>
    <MenuItem />
    <MenuItem />
</Menu>

<Dialog>
    <form>
        <DialogTitle />
        <DialogContent />
        <DialogContent />
        <DialogActions />
    </form>
</Dialog>
```

In case when component's content decorates component itself
e.g. icon for a `Tab` or `FileLink` use named props with components in them.

```tsx
<Tab icon={<AddIcon />}>
    <span>Add Element</span>
</Tab>
```

### Spread props

There are few common types of elements that any component could render:

-   The **root element** – just the root element of the virtual DOM tree that is been returned from
    component's `render` method.
-   The **target element** – the element that bears main component's load, e.g. `input` for
    `Autocomplete`. Usually both _root_ and _target_ elements are the same but not always.
-   **Additional elements** – all the rest elements playing less significant roles

Any component should spread its props to the target element.

In those cases where `root` and `target` are not the same element, main purpose of the `root`
element is styling. Main purpose of the `target` element than is to deliver business logic.
Therefore `className` and `style` props should always be passed to the `root` component.
Other props are passed to the `target` component.

```tsx
// root == target
interface TabProps extends React.HTMLAttributes<HTMLDivElement> {
    icon: React.ReactNode;
    label: React.ReactNode;
}

function Tab(props: TabProps) {
    const {icon, label, ...rootProps} = props;
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
    const {className, style, ...targetProps} = props;
    return (
        <div className={cn(className, 'gs-input-root')} style={style}>
            <input {...targetProps} className={cn(targetProps.className, 'gs-input')} />
        </div>
    );
}
```

### Ref props

In react components `ref` is a special prop which is used as a fallback in those cases where user
may need access to component's imperative API. It makes sense either for stateful components (which
can declare imperative API as its public methods) or for html elements. It doesn't make sense for
functional components and therefore is not used for them. Though, there is a workaround with
`React.forwardRef` provided. It could be used to allow functional components to "proxy" their `ref`
property towards one of their children. In our API approach this method is forbidden. If you need to
provide a `ref` pointing to component's children, use `{elementName}Ref` property. Set its type
as `React.RefObject` (React of version >= 16.3 needed) so that user could make a `ref` with
`React.createRef()` method:

```tsx
interface Props {
    inputRef: React.RefObject<HTMLInputElement>;
}

function Input(props: Props) {
    return <input ref={props.inputRef} />;
}
```

Use `rootRef` for the `root` element and semantic name for the `target` element (ex: `inputRef`)
if it is not the `root`. If you'd like to allow access to `additional` elements through refs,
use semantic names as well (ex. `labelRef` or `iconRef` for `Tab` component).

```tsx
interface TabProps extends React.HTMLAttributes<HTMLDivElement> {
    rootRef?: React.RefObject<HTMLDivElement>;
    iconRef?: React.RefObject<HTMLDivElement>;
    labelRef?: React.RefObject<HTMLDivElement>;
}

function Tab(props: TabProps) {
    const {rootRef, iconRef, labelRef, ...rootProps} = props;
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
    const {rootRef, inputRef} = props;
    return (
        <div ref={rootRef}>
            <input ref={inputRef} />
        </div>
    );
}
```

### Elements props

In some cases you can provide access to any `additional` or non-`target`/`root` props to make API
more flexible. In those cases you should define `{componentName}Props` for additional elements
(ex. `labelProps` and `iconProps` for `Tab`). Use `rootProps` for the `root` element if it is not
the `target` element.

```tsx
interface TabProps extends React.HTMLAttributes<HTMLDivElement> {
    iconProps?: React.HTMLAttributes<HTMLDivElement>;
    labelProps?: React.HTMLAttributes<HTMLDivElement>;
}

function Tab(props: TabProps) {
    const {iconProps, labelProps, ...rootProps} = props;
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
    const {rootProps, ...targetProps} = props;
    return (
        <div {...rootProps}>
            <input {...targetProps} />
        </div>
    );
}
```

Do not use `targetRef` or `targetProps` because props for `target` element are made by spreading
component's own props on it (with an exception for `className` and `style` properties which
always go to the `root` element, see below). Also `targetRef` is not semantic enough.

See also Material UI Approach sections:

-   [Nested Components](https://material-ui.com/guides/api/#nested-components)
-   [Controlled components](https://material-ui.com/guides/api/#property-naming)
-   [boolean vs enum](https://material-ui.com/guides/api/#boolean-vs-enum)

### ClassNames

For more flexible customization of components look we should provide a way to add custom
`className` strings to nested components or amend their modifiers (e.g. `disabled`, `active`,
`primary` etc.). Use `classes` property and `mergeClassesProps` utility function for that purpose.

```css
/* tab.module.css */

.root {
    /* ... */
}

.icon {
    /* ... */
}

.label {
    /* ... */
}

.disabled {
    /* ... */
}
```

```tsx
// tab.tsx
import styles from './tab.module.css';
import cn from 'classnames';
import {mergeClassesProps, WithClasses} from '../../utils/styles';

type ClassKeys = 'root' | 'icon' | 'label' | 'disabled';

interface TabProps extends WithStyles<ClassKeys> {
    disabled?: boolean;
}

function Tab(props: TabProps) {
    const {classes, style, disabled} = mergeClassesProps(props, styles);

    return (
        <div className={cn(classes.root, {[classes.disabled]: disabled})} style={style}>
            <div className={classes.icon} />
            <div className={classes.icon} />
        </div>
    );
}
```

The `mergePropsWithClasses` function returns a `props` object extended with `classes` property that
is merged with `styles`. Note that the `className` prop is always merged to `classes.root` and
removed from original `props`. `WithStyles` interface adds `className` and `classes` properties to
component's props.

After that we can use `Tab` component like this:

```css
.mainTab {
    /* ... */
}

.mainTabDisabled {
    /* ... */
}
```

```tsx
import {ClassNamesMap} from '../../utils/style';
import {Tab} from './components/tab';
import _styles from './page.module.css';

// you also can use `ClassNamesMap` from utils to type your styles
const styles = _styles as ClassNamesMap<'mainTab' | 'mainTabDisabled'>;

function MainPage() {
    return (
        <Header>
            <PageTabs>
                <Tab
                    className={styles.mainTab}
                    classes={{disabled: styles.mainTabDisabled}}
                    label="Tab With Extended Styles"
                />
            </PageTabs>
        </Header>
    );
}
```

### onChange

We follow the approach to not change standard React API whenever possible.
So we should not change standard method signatures, specifically we should not change signature of
`onChage` method for custom inputs. Use custom property `onValueChanged(value: InputType)` for that
purpose as it is more straightforward and simpler.

### Pure components

Avoid using `PureComponent` in common UI components since optimization is mostly application-specific task.

### Type definitions at the top

Declare component's `Props` and `State` interfaces at the top of component's file.
First of all we check which component API has and only then how it works.
