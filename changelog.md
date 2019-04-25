# Changelog

## [Unreleased]

### Added

-   Private `CircularCountdown` component
-   `Notification` component

### Changed

-   Use kebab case for close reasons (Overlay, Dialog)

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
