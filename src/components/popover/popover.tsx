/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Popper, PopperProps} from 'react-popper';

import {chain} from '../../utils/chain';
import {Omit} from '../../utils/omit';
import {WithClasses, mergeClassesProps} from '../../utils/styles';
import {Grow, GrowProps} from '../grow';
import {createIcon} from '../icon';
import {Paper, PaperProps} from '../paper';

import * as styles from './popover.module.css';

type Placement = PopperProps['placement'];
type TargetProps = Omit<PaperProps, 'classes'>;
type TransitionProps = Omit<GrowProps, 'appear' | 'in' | 'children'>;

const PopoverArrowIcon = createIcon(
    <svg viewBox="0 0 8 10" fill="none">
        <path d="M8 10L0 5l8-5v10z" fill="rgba(255, 255, 255, 1)" />
        <path d="M8 10L0 5l8-5" stroke="rgba(211, 211, 211, 1)" />
    </svg>
);

/** Popover public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /** If `true` popover is visible */
    open: boolean;
    /**
     * DOM element, or a function that returns the DOM element
     * (or DOM-like object @see PopperJS.ReferenceObject),
     * that will be used to set the position of the popover.
     * The return value will passed as the reference object of the Popper.js
     * instance.
     */
    referenceElement: PopperProps['referenceElement'] | (() => PopperProps['referenceElement']);
    /**
     * Popover is going to be placed according to the value of this property.
     * @see https://popper.js.org/popper-documentation.html#Popper.placements
     */
    placement?: Placement;
    /** Use position fixed for popper component. Shortcut to ReactPopper.positionFixed */
    positionFixed?: PopperProps['positionFixed'];
    /** If `true` popover will show arrow */
    withArrow?: boolean;
    /** Nested Grow transition properties */
    transitionProps?: TransitionProps;
    /** Other `<ReactPopper />` properties */
    popperProps?: Omit<
        PopperProps,
        'referenceElement' | 'children' | 'placement' | 'positionFixed'
    >;
    /**
     * Always keep the children in the DOM.
     * This property can be useful in SEO situation or
     * when you want to maximize the responsiveness of the Popper.
     */
    keepMounted?: boolean;
    /** Do not run transition on popover opening and closing */
    disableTransition?: boolean;
    /** Element that will be used for portal if passed */
    portalContainer?: Element;
    /** Properties for element that contains Paper and Arrow elements */
    popperElementProps?: Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;
}

interface State {
    exited: boolean;
}

/**
 * Popover is a element that is shown near reference element
 * to show some context information or actions.
 * It is base component to create Menus, Dropdowns and other.
 *
 * It uses [react-popper](https://github.com/FezVrasta/react-popper)
 * under the hood.
 */
export class Popover extends React.Component<Props, State> {
    public static getDerivedStateFromProps(props: Props, state: State): State {
        if (props.open) {
            return {
                exited: false
            };
        }

        return state;
    }

    private popperScheduleUpdate: (() => void) | null = null;

    public state: State = {
        exited: true
    };

    private handleTransitionExited = () => {
        this.setState({exited: true});
    };

    /**
     * Recalculate position of popper.
     * Call it when any user action changes reference element position.
     * By default `popper.js` subscribes to window scroll event.
     */
    public scheduleUpdate() {
        if (this.popperScheduleUpdate) {
            this.popperScheduleUpdate();
        }
    }

    public render() {
        const {
            referenceElement,
            popperProps = {},
            open,
            // tslint:disable-next-line no-object-literal-type-assertion
            transitionProps = {} as TransitionProps,
            placement,
            classes,
            withArrow,
            keepMounted,
            disableTransition,
            positionFixed,
            portalContainer,
            popperElementProps = {},
            ...paperProps
        } = mergeClassesProps(this.props, styles);

        const {exited} = this.state;

        if (!keepMounted && !open && (exited || disableTransition)) {
            return null;
        }

        const element =
            typeof referenceElement === 'function' ? referenceElement() : referenceElement;

        const renderTransition = (children: JSX.Element) =>
            disableTransition ? (
                children
            ) : (
                <Grow
                    {...transitionProps}
                    in={open}
                    appear
                    onExited={chain(transitionProps.onExited, this.handleTransitionExited)}
                >
                    {children}
                </Grow>
            );

        const popper = (
            <Popper
                {...popperProps}
                positionFixed={positionFixed}
                placement={placement}
                referenceElement={element}
            >
                {({
                    ref,
                    style: popperContainerStyle,
                    scheduleUpdate,
                    arrowProps,
                    placement: popperPlacement
                }) => (
                    <div
                        style={popperContainerStyle}
                        className={classNames(classes.root, {
                            [classes.withArrow]: withArrow
                        })}
                        data-placement={popperPlacement}
                        ref={(node) => {
                            ref(node);
                            this.popperScheduleUpdate = scheduleUpdate;
                        }}
                    >
                        {renderTransition(
                            <div
                                {...popperElementProps}
                                className={classNames(popperElementProps.className, classes.popper)}
                            >
                                <Paper
                                    {...paperProps}
                                    className={classNames(paperProps.className, classes.paper)}
                                />
                                <div
                                    {...arrowProps}
                                    className={classNames(classes.arrow, {
                                        [classes.arrowHidden]: !withArrow
                                    })}
                                >
                                    <PopoverArrowIcon className={classes.arrowIcon} />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Popper>
        );

        return portalContainer ? ReactDOM.createPortal(popper, portalContainer) : popper;
    }
}