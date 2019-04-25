/*
 * Copyright (c) 2011-2019 Genestack Limited
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
import {Omit} from '../../utils/omit';
import {WithClasses, mergeClassesProps} from '../../utils/styles';
import {Button, ButtonProps} from '../button';
import {Fade} from '../fade';
import {Overlay, OverlayProps, OverlayCloseReason} from '../overlay';
import {PaperProps, Paper} from '../paper';

import {DialogContext} from './dialog-context';
import * as styles from './dialog.module.css';

type TargetProps = Omit<PaperProps, 'classes'> & Pick<OverlayProps, 'open'>;
type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

type CloseHandler = (reason: DialogCloseReason, event?: React.SyntheticEvent) => void;

/** Dialog Close Reason  */
export type DialogCloseReason = OverlayCloseReason | 'header-close-button-click';

/** Dialog public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /**
     * By default Dialog could not be more than viewport.
     * When dialog content is more than dialog DialogBody is being scrollable.
     * In compact mode scroll appears for whole viewport.
     * Also in compact view DialogFooter and DialogBody do not have dividers.
     */
    compact?: boolean;
    /** Hides close button */
    hideCloseButton?: boolean;
    /** Properties passed to close button */
    closeButtonProps?: ButtonProps;
    /** Calls when dialog closes by user action */
    onClose?: CloseHandler;
    /** You can use any transition component to display Dialog */
    transitionComponent?: React.ComponentType<Omit<TransitionProps, 'timeout'>>;
    /** Properties passed to Overlay component */
    overlayProps?: Omit<OverlayProps, 'open' | 'onClose'>;
    /** Properties passed to container element */
    containerProps?: ContainerProps;
}

/**
 * Dialogs is a modal overlays that could contains some information or controls.
 *
 * Mostly dialog should contain
 * `<DialogHeader />`, `<DialogBody />` and `<DialogFooter />` elements.
 */
export class Dialog extends React.Component<Props> {
    private handleCloseButtonClick: ButtonProps['onClick'] = (event) => {
        if (this.props.onClose) {
            this.props.onClose('header-close-button-click', event);
        }
    };

    private handleContainerClick: ContainerProps['onClick'] = (event) => {
        if (event.target !== event.currentTarget) {
            return;
        }

        if (this.props.onClose) {
            this.props.onClose('backdrop-click', event);
        }
    };

    public render() {
        const {
            open,
            compact = false,
            onClose,
            overlayProps = {},
            transitionComponent: Transition = Fade,
            classes,
            children,
            hideCloseButton = false,
            closeButtonProps = {},
            containerProps = {},
            ...rest
        } = mergeClassesProps(this.props, styles);

        return (
            <DialogContext.Provider value={{compact, hideCloseButton}}>
                <Overlay
                    {...overlayProps}
                    open={open}
                    onClose={onClose}
                    className={classNames(overlayProps.className, classes.overlay, {
                        [classes.overlayScrollable]: compact
                    })}
                >
                    <div
                        {...containerProps}
                        onClick={chain(containerProps.onClick, this.handleContainerClick)}
                        className={classNames(containerProps.className, classes.container)}
                    >
                        <Transition in={open} appear>
                            <Paper
                                {...rest}
                                tabIndex={-1}
                                className={classNames(rest.className, classes.root)}
                            >
                                {children}

                                {!hideCloseButton ? (
                                    <Button
                                        icon={<CrossIcon />}
                                        variant="ghost"
                                        {...closeButtonProps}
                                        className={classNames(
                                            closeButtonProps.className,
                                            classes.closeButton
                                        )}
                                        onClick={chain(
                                            closeButtonProps.onClick,
                                            this.handleCloseButtonClick
                                        )}
                                    />
                                ) : null}
                            </Paper>
                        </Transition>
                    </div>
                </Overlay>
            </DialogContext.Provider>
        );
    }
}
