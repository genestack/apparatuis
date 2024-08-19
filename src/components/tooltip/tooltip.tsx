/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import React from 'react';

import {chainRefs} from '../../utils';
import {chain} from '../../utils/chain';
import {DarkContext} from '../../utils/dark-context';
import {mergeClassesProps, WithClasses} from '../../utils/styles';
import {createIcon} from '../icon';
import {TransitionPopper, TransitionPopperProps} from '../transition-popper';
import {Typography} from '../typography';

import {TooltipSlide} from './tooltip-slide-transition';
import * as styles from './tooltip.module.css';

type TargetElementProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;
type TargetProps = Omit<TransitionPopperProps<TargetElementProps>, 'children'>;

const TooltipArrowIcon = createIcon(
    <svg viewBox="0 0 8 10">
        <path d="M8 10L0 5l8-5v10z" fill="rgba(51, 51, 51, 1)" />
    </svg>
);

/** Reason of tooltip close */
export type TooltipCloseReason = 'escape_keydown';

type TooltipCloseHandler = (reason: TooltipCloseReason, event?: Event) => void;

/** Tooltip public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /** Do not add paddings to tooltip content */
    noGaps?: boolean;
    /**
     * Request to close tooltip. It accepts close reason and event.
     * @see OverlayCloseReason
     */
    onClose?: TooltipCloseHandler;
    /**
     * Calls when the tooltip is closed, all transitions are completed
     * and the component is ready for unmount
     */
    onClosed?: () => void;
    /** Do not listen `Escape` keypress for closing */
    disableEscListener?: boolean;
    /** Reference to react-popper instance */
    popperRef?: React.Ref<TransitionPopper<TargetElementProps>>;
    children?: React.ReactNode;
}

/**
 * Tooltip is a simple and small block of text that shows some useful information
 * near some reference element.
 */
export const Tooltip = React.forwardRef<HTMLDivElement, Props>(function Tooltip(props, rootRef) {
    const {
        popperRef,
        children,
        classes,
        placement = 'top',
        noGaps,
        onClose,
        onClosed,
        disableEscListener,
        ...rest
    } = mergeClassesProps(props, styles);

    React.useEffect(() => {
        const handleWindowKeyDown = (event: KeyboardEvent) => {
            if (disableEscListener) {
                return;
            }

            if (event.key === 'Escape') {
                onClose?.('escape_keydown', event);
            }
        };

        window.addEventListener('keydown', handleWindowKeyDown);

        return () => {
            window.removeEventListener('keydown', handleWindowKeyDown);
        };
    }, [disableEscListener, onClose]);

    return (
        <TransitionPopper<TargetElementProps> {...rest} ref={popperRef} placement={placement}>
            {({
                ref,
                style,
                arrowProps,
                placement: actualPlacement,
                targetProps,
                onTransitionExited
            }) => (
                <div
                    ref={chainRefs(ref, rootRef)}
                    style={style}
                    data-placement={actualPlacement}
                    className={classes.popperContainer}
                >
                    <TooltipSlide
                        appear
                        disableTransition={rest.disableTransition}
                        placement={actualPlacement}
                        open={!!actualPlacement && rest.open}
                        onExited={chain(onTransitionExited, onClosed)}
                    >
                        <div data-placement={actualPlacement} className={classes.tooltipContainer}>
                            <DarkContext.Provider value>
                                <Typography
                                    data-qa="tooltip"
                                    as="div"
                                    {...targetProps}
                                    className={classNames(targetProps.className, classes.root, {
                                        [classes.withGaps]: !noGaps
                                    })}
                                    variant="caption"
                                >
                                    {children}
                                </Typography>
                            </DarkContext.Provider>
                            <div
                                {...arrowProps}
                                data-placement={actualPlacement}
                                className={classes.arrow}
                            >
                                <TooltipArrowIcon
                                    data-placement={actualPlacement}
                                    className={classes.arrowIcon}
                                />
                            </div>
                        </div>
                    </TooltipSlide>
                </div>
            )}
        </TransitionPopper>
    );
});
