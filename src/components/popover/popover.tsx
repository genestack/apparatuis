/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {Omit} from '../../utils/omit';
import {Ref} from '../../utils/set-ref';
import {WithClasses, mergeClassesProps} from '../../utils/styles';
import {createIcon} from '../icon';
import {Paper, PaperProps} from '../paper';
import {TransitionPopper, TransitionPopperProps} from '../transition-popper';

import {PopoverGrow, Props as PopperGrowProps} from './popover-grow-transition';
import * as styles from './popover.module.css';
import {chain} from '../../utils/chain';

type TargetProps = Omit<TransitionPopperProps<PaperProps>, 'classes' | 'children'>;
type ContainerProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'style'>;
type TransitionProps = Omit<
    PopperGrowProps,
    'appear' | 'disableTransition' | 'placement' | 'exit' | 'children'
>;

const PopoverArrowIcon = createIcon(
    <svg viewBox="0 0 8 10" fill="none">
        <path d="M8 10L0 5l8-5v10z" fill="rgba(255, 255, 255, 1)" />
        <path d="M8 10L0 5l8-5" stroke="rgba(211, 211, 211, 1)" />
    </svg>
);

/** Popover public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /** If `true` popover will show arrow */
    withArrow?: boolean;
    popperRef?: Ref<TransitionPopper<PaperProps>>;
    popperElementProps?: React.HTMLAttributes<HTMLDivElement>;
    containerProps?: ContainerProps;
    transitionProps?: TransitionProps;
    children?: React.ReactNode;
}

/**
 * Popover is a element that is shown near reference element
 * to show some context information or actions.
 * It is base component to create Menus, Dropdowns and other.
 *
 * It uses [react-popper](https://github.com/FezVrasta/react-popper)
 * under the hood.
 */
export const Popover = (props: Props) => {
    const {
        classes,
        withArrow,
        popperRef,
        containerProps = {},
        transitionProps = {},
        popperElementProps = {},
        children,
        ...rest
    } = mergeClassesProps(props, styles);

    return (
        <TransitionPopper<PaperProps> {...rest} ref={popperRef}>
            {({ref, style, arrowProps, placement, targetProps, onTransitionExited}) => (
                <div
                    {...containerProps}
                    ref={ref}
                    style={style}
                    className={classNames(containerProps.className, {
                        [classes.withArrow]: withArrow
                    })}
                    data-placement={placement}
                >
                    <PopoverGrow
                        {...transitionProps}
                        appear
                        disableTransition={rest.disableTransition}
                        placement={placement}
                        open={!!placement && rest.open}
                        onExited={chain(transitionProps.onExited, onTransitionExited)}
                    >
                        <div
                            {...popperElementProps}
                            className={classNames(popperElementProps.className, classes.popper)}
                            data-placement={placement}
                        >
                            <Paper
                                {...targetProps}
                                className={classNames(targetProps.className, classes.paper)}
                            >
                                {children}
                            </Paper>
                            <div
                                {...arrowProps}
                                data-placement={placement}
                                className={classNames(classes.arrow, {
                                    [classes.arrowHidden]: !withArrow
                                })}
                            >
                                <PopoverArrowIcon className={classes.arrow} />
                            </div>
                        </div>
                    </PopoverGrow>
                </div>
            )}
        </TransitionPopper>
    );
};
