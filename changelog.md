# Changelog

## [11.7.0] - 2021-07-19

-   Added `iconStart`, `iconEnd` to `<Button/>`
-   Added deprecated comment for `icon` API to `<Button/>`

## [11.6.0] - 2021-07-02

### Changed

-   Update peer to `react@16.14.0` `react-dom@16.14.0` `@types/react@16.14.5` `@types/react-dom@16.9.12`

## [11.5.0] - 2021-06-21

### Added

-   Added `<ReverseArrowsIcon />`

## [11.4.0] - 2021-06-10

-   Fix errors in examples
-   Pass styles to popover container
-   Pass refs to suggest inputs
-   Add `data-qa` to `<Select />`

## [11.3.0] - 2021-06-10

-   Allow any component with `value` property to be passed in `<SuggestInput />` as `<SuggestInputItem />`

## [11.2.0] - 2021-04-09

### Added

-   Added `<NarrowIcon />`, `<WidenIcon />`

## Unreleased

## [11.1.0] - 2021-04-08

### Added

-   Added `<BoxplotIcon />`

## [11.0.2] - 2021-03-19

### Added

-   Added `data-qa` to `<Tab />` and `<Tabs />`

## [11.0.1] - 2021-03-13

### Fixed

-   `<Tab />` remove conditional hook usage

## [11.0.0] - 2021-02-26

### Removed

-   `<Checkbox />`

## [10.14.1] - 2021-02-15

### Fixed

-   Fixed select [option](src/components/select/option.tsx) font color in FF
-   Add types for [option](src/components/select/option.tsx)

## [10.14.0] - 2021-01-15

### Added

-   Added `usePopoverHandler` hook and `<PopoverHandler/>`

## [10.13.0] - 2020-12-08

### Added

-   Added `shrink` `grow` properties in `<HeaderItemCell/>`

## [10.12.0] - 2020-12-02

### Added

-   Added `align` `justify` `flexWrap` `direction` properties and `0` variant for `gap` property in `<Flex/>`

## [10.11.0] - 2020-11-25

### Added

-   Added `flexWrap` property in `<Controls/>`

## [10.10.0] - 2020-11-23

### Added

-   Added `<SampleIcon />`, `<KebabIcon />`

## [10.9.3] - 2020-11-23

### Fixed

-   Fixed `ellipsis` property in `<Link/>`

## [10.9.2] - 2020-11-16

### Added

-   Overridden scrollableNodeProps types for [ScrollView](src/components/scroll-view/scroll-view.tsx)
-   Extends "Options" types from a simplebar for [ScrollView](src/components/scroll-view/scroll-view.tsx)

## [10.9.1] - 2020-11-10

### Fixes

-   Fix indicator animation for [Tab](src/components/tab/tab.tsx)

## [10.9.0] - 2020-11-06

### Added

-   Add to imports [Tabs](src/components/tabs/tabs.tsx) from genestack-ui
-   Add [CloneProps](src/utils/clone-props.ts)
-   Add "deprecated" comment for tooltip and tooltipProps in [Tab](src/components/tab/tab.tsx) is deprecated

## [10.8.0] - 2020-10-30

### Changed

-   Add [PresentationSection](styleguide-components/presentation/presentation-section.ts)
-   Add tooltip property to [Tab](src/components/tab/tab.tsx)
-   Fix tab background hover

### Added

-   Add [DropdownTabs](src/components/dropdown-tabs/dropdown-tabs.tsx)

## [10.6.1] - 2020-10-22

### Fixed

-   Mount `<Popper>` in `<Suggest>` only when it opened for better performance

## [10.6.0] - 2020-10-21

### Added

-   Add [Indicator](src/components/tab/indicator.tsx)
-   Add `animated` property for [Tabs](src/components/tabs/tabs.tsx)

## [10.5.0] - 2020-10-20

### Added

-   Added `<DictionaryIcon />`, `<LockOutlinedIcon />`, `<RetryIcon>`, `<TrashIcon>`

## [10.4.0] - 2020-10-16

### Added

-   Added [Tabs](src/components/tabs/tabs.tsx)

### Added

-   Added [Tab](src/components/tab/tab.tsx)

## [10.2.1] - 2020-10-08

### Fixed

-   Fixed rendering of bold fonts in Windows

## [10.2.0] - 2020-10-08

### Added

-   Add keepMounted property to [Menu](src/components/menu/menu.tsx) and [Overlay](src/components/overlay/overlay.tsx)

## [10.1.0] - 2020-09-22

### Changed

-   Changed color of [Typography](src/components/typography/typography.tsx) `intent = 'quiet'`
    for `body` and `caption` variants
-   Changed colors of `Button` `intent="alarm"`, `Badge` `intent="warning"`

### Added

-   Added inverted [Badge](src/components/badge/badge.tsx)
-   Added slashed zeros as a default feature of [Typography](src/components/typography/typography.tsx)

## [10.0.0] - 2020-09-17

### Changed

-   Changed [Select](src/components/select/select.tsx) API
-   Add [Select](src/components/select/select.tsx) support in native and menu mode
-   Add [Option](src/components/select/option.tsx)
-   Add [OptionLabel](src/components/select/option-label.tsx)
-   Add [SelectEmitter](src/components/select/select-emitter.tsx)
-   Add [ArrowBottomThinIcon](src/icons/arrow-bottom-thin-icon.tsx)
-   Changed a default font-family to `IBM Plex Sans`
-   Changed [Typography](src/components/typography/typography.tsx) public properties:
    -   `quiet` to `intent = 'quiet'`
    -   `status = 'success' | 'warning' | 'error'` to `intent = 'success' | 'warning' | 'alarm'`
    -   added `boolean condensed` property
-   Changed [Typography](src/components/typography/typography.tsx) `classes`:
    -   `error` to `alarm`

## [9.0.3] - 2020-09-15

### Added

-   Add `<SuggestInput/>` popper events only when it opened

## [9.0.2] - 2020-09-10

### Added

-   Add `as` property to `<Link />`

## [9.0.1] - 2020-09-10

### Changed

-   Change assembly of styles for external libraries
-   Add SimpleBar to externals in webpack

## [9.0.0] - 2020-09-02

### Changed

-   Builds code into a bundle

## [8.5.0] - 2020-08-03

### Added

-   Add `<GearIcon />`, `<GenericFileIcon />`, `<StudyIcon>`

## [8.4.2] - 2020-07-08

### Changed

-   Changed `<Paper />` to consume dark context and change own appearance depending on its value
-   Updated scrollbar colors in `<ScrollView />`

## [8.4.1] - 2020-06-30

### Fixed

-   Fix clicks on `<InteractiveElement />` when it is a button or a link

## [8.4.0] - 2020-06-29

-   Add `<TemplateIcon />`

## [8.3.1] - 2020-06-19

### Changed

-   Introduce `showScrollbars` option of `<ScrollView />` component

## [8.3.0] - 2020-06-22

## Changed

-   Changed `intent = 'default'` to `intent = 'no-intent'` in `ButtonBase` public properties
-   Changed `intentDefault` to `noIntent` in `ButtonBase` `classes`
-   Changed `ghost`-opposite `variant: 'normal'` to `variant: 'solid'` in `Button` and `ButtonGroup` examples

## [8.2.1] - 2020-06-11

### Fixed

-   Fix <Input /> height

## [8.2.0] - 2020-06-11

### Added

-   Add `<Badge/>` component
-   Add `<FirstPageIcon />`
-   Add `<LastPageIcon />`

## [8.1.1] - 2020-06-11

### Fixed

-   Reset focus state on disable `<Input />`

## [8.1.0] - 2020-06-09

### Changed

-   Enable ref on `<InteractiveElement />`

## [8.0.1] - 2020-06-04

### Changed

-   Update `<BookmarkIcon />` path colouring in

## [8.0.0-alpha.59] - 2020-06-03

### Changed

-   Update `<BookmarkIcon />` path dimensions
-   Update `<BookmarkBorderedIcon />` path dimensions, rounded corners and colouring in

## [8.0.0-alpha.58] - 2020-06-03

### Added

-   Add `<ScrollView />` component

## [8.0.0-alpha.57] - 2020-06-02

### Changed

-   Enable ref on `<ListItem />`

## [8.0.0-alpha.56] - 2020-06-02

### Changed

-   Change `<UserGroupIcon />`
-   Change `<PlusUserIcon />`
-   Change `<SharedWithUserIcon />`
-   Change `<UserIcon />`

## [8.0.0-alpha.55] - 2020-06-01

### Added

-   Add `<UserGroupIcon />`

### Changed

-   Change `<PlusUserIcon />`
-   Change `<SharedWithUserIcon />`
-   Change `<UserIcon />`

## [8.0.0-alpha.54] - 2020-05-20

-   Fix TS error in `<Avatar/>` component

## [8.0.0-alpha.53] - 2020-05-08

### Added

-   Add `<OrganizationIcon />`, `<SharedWithUserIcon />`

## [8.0.0-alpha.52] - 2020-05-07

### Fixed

-   Add `data-qa` attribute to `<Avatar />` component

## [8.0.0-alpha.51] - 2020-05-07

### Added

-   Add `<Avatar />` component
-   Add `<ArrowDownloadThinIcon />`, `<FiltersIcon />`

## [8.0.0-alpha.50] - 2020-04-02

### Changed

-   Change `<RadioIcon />`
-   Change `<CheckedRadioIcon />`

## [8.0.0-alpha.49] - 2020-04-01

### Added

-   Add `<RadioIcon />`
-   Add `<CheckedRadioIcon />`
-   Add `gs-color-grey-outline-20` color

## [8.0.0-alpha.48] - 2020-03-30

### Added

-   `<Select>`: add `selectRef` prop

## [8.0.0-alpha.47] - 2020-03-10

### Fixed

-   Fix IE11 error for `Element.prototype.matches`

## [8.0.0-alpha.46] - 2020-03-05

### Added

-   `<TimeReverseIcon />`
-   `<UploadIcon />`
-   `<DraftIcon />`
-   `<BulletIcon />`

### Fixed

-   Fixed `<MenuIcon />` path blurring on Windows

## [8.0.0-alpha.45] - 2020-02-27

### Added

-   `<BooleanIcon />`, `<DateIcon />`, `<DecimalIcon />`, `<IntegerIcon />`, `<LinkIcon />`, `<TextIcon />`

## [8.0.0-alpha.44] - 2020-02-20

### Added

-   Export `<Switch />` from index file
-   Add `data-qa` attribute to all components

## [8.0.0-alpha.43] - 2020-02-13

### Fixed

-   Fix margins for list in `<SuggestInput />`
-   Do not close `<Dialog />` when `overlayProps.disableClickListener = true`

### Added

-   New color variable `--gs-color-grey-light-background`

## [8.0.0-alpha.42] - 2020-02-04

### Fixed

-   [ButtonBase] Do not call `onClick` from disabled fieldset (https://git.io/JvGuI)

## [8.0.0-alpha.41] - 2020-01-09

### Added

-   Add new `<Switch />` component

## [8.0.0-alpha.40] - 2020-01-09

### Changed

-   Update `typescript@3.7.2`

## [8.0.0-alpha.39] - 2019-12-17

### Fixed

-   Pass all props from `<MarginBox />` to `<DialogBody />`

## [8.0.0-alpha.38] - 2019-12-09

### Fixed

-   Fix React warning about state updates after unmounting for `<TooltipHandler />`
-   Enable `openDelay` works property for `<TooltipHandler />`

## [8.0.0-alpha.37] - 2019-11-29

### Fixed

-   Fix icon colors for hovered ghost buttons

## [8.0.0-alpha.36] - 2019-11-29

### Changed

-   Increase margins for `<List>` component to 16px

## [8.0.0-alpha.35] - 2019-11-19

### Added

-   `<CrossSmallIcon />`

### Fixed

-   Fix `onBlur` and `onFocus` props mismatching for `<MenuItem />`

## [8.0.0-alpha.34] - 2019-11-06

### Changed

-   Changed `background` to `background-color` css property of `ListItem`

### Fixed

-   Fixed passing of `titleProps` in `MenuItem`

## [8.0.0-alpha.33] - 2019-09-08

-   Add `UserIcon` icon

## [8.0.0-alpha.32] - 2019-09-04

### Added

-   Add `useMenuHandler` hook
-   Add `useTooltipHandler` hook

### Fixed

-   Fix problem with `z` axis for `Tooltip`

## [8.0.0-alpha.31] - 2019-09-02

### Fixed

-   Export `ButtonGroup` from `genestack-ui`

## [8.0.0-alpha.30] - 2019-08-29

### Added

-   `<BookmarkBorderedIcon >`

### Removed

-   `<LedIcon />`

## [8.0.0-alpha.29] - 2019-08-27

### Added

-   Add new `<BaseButton />` component
-   Add `<Field />` component
-   Add `<BookmarkIcon >`, `<CheckMarkIcon />`, `<EyeIcon />`, `<KeyboardArrowLeftIcon />`,
    `<LedIcon />`, `<PlusIcon />` and `<WarningIcon />` components. Now they can be
    imported as `import {FooIcon, BarIcon} form 'genestack-ui/src/icons';`
-   [Button] Add `size` property with new `small` and `tiny` variants
-   [Button] Add `intent` property with new `alarm` variant
-   [Button] Add `ghost` separated property

### Changed

-   [Button] Breaking change `variant="ghost"` -> `ghost={true}`
-   [Button] Breaking change `variant="primary"` -> `intent="accent"`
-   [Button] Breaking change `variant="outlined"` -> `ghost intent="accent"`
-   [Button] Breaking change `as` -> `component`
-   [Button] Breaking change `tiny` -> `size="small"`
-   Breaking change `<Controls/>` `gap={6}` -> `gap={4}`
-   Update dependencies
-   Rename `<BaseButton />` to `<InteractiveElement />`

### Removed

-   [Button] Remove `href` property (to enable `href` property use `component="a"`)

### Fixed

-   Fix caption in `TextLabel` to display `0`
-   Fix background for auto-filled `<Input />` component

## [8.0.0-alpha.28] - 2019-08-05

### Changed

-   Change `MoreIcon` view to tiny

## [8.0.0-alpha.27] - 2019-08-05

### Fixed

-   Fix scroll position when long dialog is opening

## [8.0.0-alpha.26] - 2019-08-02

### Fixed

-   Fix focusing elements when menu is closing

## [8.0.0-alpha.25] - 2019-07-25

### Added

-   Add `roundCorners` property to `Popover`
-   Add round corners in `Suggest`'s `Popover`

## [8.0.0-alpha.24] - 2019-07-24

### Fixed

-   Add missed `refs` in `Overlay`, `Popover`, `SuggestInput`

## [8.0.0-alpha.23] - 2019-07-24

### Fixed

-   Improve SuggestInput key down behaviour

## [8.0.0-alpha.22] - 2019-07-23

### Fixed

-   Fix padding for `MenuCaption`
-   Export `MenuCaption` from `genestack-ui`
-   Props spreading in `SuggestInput`
-   Max-height in `SuggestInput`

## [8.0.0-alpha.21] - 2019-07-19

### Fixed

-   Fix updating suggest position after children change
-   Add `as` property to dialog
-   Do not close Dialog if click event starts into it

## [8.0.0-alpha.20] - 2019-07-10

### Added

-   Add `ArrowDownloadIcon`, `InfoIcon`, `PlusUserIcon`, and `PlayCircledIcon` icons
-   Add `MenuCaption` component

## [8.0.0-alpha.19] - 2019-07-09

### Changed

-   Change paddings in `Divider` component

### Fixed

-   Fix margins for transparent `Divider` in Safari

## [8.0.0-alpha.18] - 2019-07-08

### Added

-   Add `Preloader` component

## [8.0.0-alpha.17] - 2019-06-28

### Removed

-   **(breaking change)** Remove `ListItemText`, `ListItemCell`, `ListLabel` components

### Added

-   **(breaking change)** Add `interactive` property for `ListItem`. `false` by default
-   Add `subtitle`, `prepend` and `append` properties to `ListItem`

## [8.0.0-alpha.16] - 2019-06-24

### Added

-   `subtitle` property for `MenuItem`

### Removed

-   **(breaking change)** Remove `MenuItemText`, `MenuItemCell` components

### Fixed

-   Fix `HeaderItemText` margins

## [8.0.0-alpha.15] - 2019-06-21

### Added

-   Add `TextLabel` component

### Changed

-   Use `p` for `body` and `caption` variants in Typography
-   Set default icon `vertical-align` to `bottom`

## [8.0.0-alpha.14] - 2019-06-20

### Fixed

-   Fixed missed `className` for `Link`

### Changed

-   Change default highlighter to `<b/>` in `Highlight` component
-   Rename `renderMark` to `renderHighlighter` property for `Highlight` component

## [8.0.0-alpha.13] - 2019-06-20

### Added

-   Add `prepend` and `append` properties to `Link`

### Fixed

-   Fix missed `className` for `Header` component

### Removed

-   Remove `Paper` border

### Changed

-   Change default `Paper` shadow

## [8.0.0-alpha.12] - 2019-06-20

### Added

-   Add `align` property to `Controls` component
-   Add `Highlight` component
-   Add `SuggestInput` component
-   Add `append` element to `MenuItem`
-   Add automatic determination of tag name based on `variant` props

### Removed

-   Remove `Autocomplete` component
-   Remove default margins for `Typography` with `as`
-   Replace `icon` property with `prepend` in `MenuItem`

## [8.0.0-alpha.11] - 2019-06-07

### Changed

-   Update peer to `react@16.8`

### Added

-   Add `RootElement` component
-   Add `Link` component
-   Add `Spinner` component

### Fixed

-   Increase right padding for menu items

## [8.0.0-alpha.10] - 2019-05-27

### Added

-   [Typography] Add `ellipsis` property

## [8.0.0-alpha.9] - 2019-05-23

### Changed

-   Rename `<TextareaAutosize />` to `<Textarea />`

### Added

-   `fullWidth` and `invalid` properties to `<Textarea />`

## [8.0.0-alpha.8] - 2019-05-17

### Fixed

-   Fixed typings for missed css modules

## [8.0.0-alpha.7] - 2019-05-14

### Added

-   Add `href` property to `Button`, `HeaderItem`, `ListItem` and `MenuItem`
    to make they render as anchor element.
-   [TooltipHandler] Add `openDelay` property.
-   [Dialog] Add `size`, `scrollable` properties.

### Removed

-   [Dialog] Remove `compact` property.

### Fixed

-   [Dialog] Fix `autoFocus` inputs on open.
-   [TooltipHandler] Fix typings for `tooltip` property.

## [8.0.0-alpha.6] - 2019-05-04

### Added

-   Private `CircularCountdown` component
-   `Notification` component
-   Dark context for colors inverting
-   [Button] Inverted colors
-   [Divider] Inverted colors
-   [Typography] Inverted colors
-   [Typography] Add status colors (`success`, `error`, `warning`)

### Changed

-   Use kebab case for close reasons (Overlay, Dialog)

### Fixed

-   Types in `focusable-elements`

## [8.0.0-alpha.5] - 2019-04-22

### Fixed

-   Move `@types/react-transition-group` dependency from `dev`.

## [8.0.0-alpha.4] - 2019-04-22

### Fixed

-   [Dialog] Fix width in non-compact mode

## [8.0.0-alpha.3] - 2019-04-19

### Added

-   [Input] Add new property `fullWidth`.
-   [Input] Add new property `inputRef`.
-   [Typography] Add export from index.ts.

### Changed

-   [Input] Rename `hasError` property to `invalid`.
-   [Input] Remove `event` argument from `onValueChange` callback.
-   [Input] Make `onChange` callback as original `input.onChange`.

## [8.0.0-alpha.2] - 2019-04-19

### Components Added

-   Header, HeaderItem, HeaderItemCell, HeaderItemIcon, HeaderItemText, HeaderItemSecondaryActions

### Updated

-   Peer `genestack-frontend-builder` to `>= 0.9.0`

## [8.0.0-alpha.1] - 2019-04-18

### Components Added

-   Button
-   ButtonGroup
-   Tooltip, TooltipHandler
-   Backdrop
-   FocusTrap
-   Overlay
-   Paper
-   Divider
-   FlexExpander
-   List, ListItem, ListItemCell, ListItemText
-   Popover
-   Menu, MenuItem, MenuItemCell, MenuItemText, SubMenu, MenuHandler
-   HiddenScrollBar
-   Drawer, DrawerFullWidth
-   WithSeparator
-   RootRef
-   Dialog, DialogHeader, DialogFullWidth, DialogFooter, DialogBody
-   PageContent, PageFullWidth
-   Controls, ControlsItem

### Transitions Added

-   Fade
-   Shake
-   Grow
-   Slide

### Icons Added

-   ArrowLeftIcon
-   ArrowRightIcon
-   CrossIcon
-   DownloadIcon
-   FileIcon
-   HelpIcon
-   KeyboardArrowBottomIcon
-   KeyboardArrowRightIcon
-   LockIcon
-   MenuIcon
-   MoreIcon
-   OpenFolderIcon
-   PauseIcon
-   PlayIcon
-   ShareIcon
-   StopIcon

## [7.0.0-alpha.2] - 2018-11-28

### Fixed

-   Fix typescript compiler checks

### Added

-   Types check to tests
-   Readme.md
