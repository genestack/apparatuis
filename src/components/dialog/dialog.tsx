/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';
import {TransitionProps} from 'react-transition-group/Transition';

import {CrossIcon} from '../../icons/cross-icon';
import {chain} from '../../utils/chain';
import {SlotProps} from '../../utils/slot-props';
import {WithClasses, mergeClassesProps} from '../../utils/styles';
import {Button, ButtonProps} from '../button';
import {Fade} from '../fade';
import {Overlay, OverlayProps, OverlayCloseReason} from '../overlay';
import {PaperProps, Paper} from '../paper';

import {DialogContext} from './dialog-context';
import * as styles from './dialog.module.css';

type TargetProps = PaperProps & Pick<OverlayProps, 'open'>;
type ContainerProps = SlotProps<'div'>;

type CloseHandler = (reason: DialogCloseReason, event?: React.SyntheticEvent) => void;

/** Dialog Close Reason  */
export type DialogCloseReason = OverlayCloseReason | 'header-close-button-click';

/** Dialog public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /**
     * Allows scrolling the `DialogBody` instead of the entire `Dialog` when overflowing.
     */
    scrollable?: boolean;
    /** Hides close button */
    hideCloseButton?: boolean;
    /** Properties passed to close button */
    closeButtonProps?: ButtonProps & SlotProps<'button'>;
    /** Calls when dialog closes by user action */
    onClose?: CloseHandler;
    /** Calls when dialog close transition is completed */
    onClosed?: () => void;
    /** You can use any transition component to display Dialog */
    transitionComponent?: React.ComponentType<Omit<TransitionProps, 'timeout'>>;
    /** Properties passed to Overlay component */
    overlayProps?: Omit<OverlayProps, 'open'>;
    /** Properties passed to container element */
    containerProps?: ContainerProps;
    /** Fixes width of dialog */
    size?: 'small' | 'medium' | 'large' | 'auto';
}

/**
 * Dialogs is a modal overlays that could contains some information or controls.
 *
 * Mostly dialog should contain
 * `<DialogHeader />`, `<DialogBody />` and `<DialogFooter />` elements.
 */
export function Dialog(props: Props) {
    const handleCloseButtonClick: ButtonProps['onClick'] = (event) => {
        if (props.onClose) {
            props.onClose('header-close-button-click', event);
        }
    };

    const mouseDownRef = React.useRef<EventTarget>();

    const handleContainerMouseDown: React.MouseEventHandler = (event) => {
        mouseDownRef.current = event.target;
    };

    const handleContainerClick: ContainerProps['onClick'] = (event) => {
        if (event.target !== event.currentTarget) {
            return;
        }

        // Make sure the event starts and ends on the same DOM element.
        if (event.target !== mouseDownRef.current) {
            return;
        }

        if (props.overlayProps?.disableClickListener === true) {
            return;
        }

        if (props.onClose) {
            props.onClose('backdrop-click', event);
        }
    };

    const {
        open,
        scrollable = false,
        onClose,
        onClosed,
        overlayProps = {},
        transitionComponent: Transition = Fade,
        classes,
        children,
        hideCloseButton = false,
        closeButtonProps = {},
        containerProps = {},
        size = 'auto',
        ...rest
    } = mergeClassesProps(props, styles);

    return (
        <Overlay
            {...overlayProps}
            open={open}
            onClose={chain(overlayProps.onClose, onClose)}
            onClosed={chain(overlayProps.onClosed, onClosed)}
            className={classNames(overlayProps.className, classes.overlay, {
                [classes.overlayScrollable]: !scrollable
            })}
        >
            <DialogContext.Provider value={{scrollable, hideCloseButton}}>
                <div
                    {...containerProps}
                    onClick={chain(containerProps.onClick, handleContainerClick)}
                    onMouseDown={chain(containerProps.onMouseDown, handleContainerMouseDown)}
                    className={classNames(containerProps.className, classes.container)}
                >
                    <Transition in={open} appear>
                        <Paper
                            data-qa="dialog"
                            {...rest}
                            tabIndex={-1}
                            className={classNames(rest.className, classes.root, {
                                [classes.small]: size === 'small',
                                [classes.medium]: size === 'medium',
                                [classes.large]: size === 'large'
                            })}
                        >
                            {children}

                            {!hideCloseButton ? (
                                <Button
                                    {...closeButtonProps}
                                    ghost
                                    size="tiny"
                                    component="button"
                                    className={classNames(
                                        closeButtonProps.className,
                                        classes.closeButton
                                    )}
                                    onClick={chain(
                                        closeButtonProps.onClick,
                                        handleCloseButtonClick
                                    )}
                                >
                                    <CrossIcon />
                                </Button>
                            ) : null}
                        </Paper>
                    </Transition>
                </div>
            </DialogContext.Provider>
        </Overlay>
    );
}
