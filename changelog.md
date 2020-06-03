# Changelog

## [Unreleased]

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
