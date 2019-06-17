# Changelog

## [Unreleased]

### Added

-   Add `align` property to `Controls` component
-   Add `Highlight` component
-   Add `SuggestInput` component
-   Add `append` element to `MenuItem`

### Removed

-   Remove `Autocomplete` component
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
