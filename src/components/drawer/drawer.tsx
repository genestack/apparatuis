/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {WithClasses, mergeClassesProps} from '../../utils/styles';
import {MarginBox} from '../margin-box';
import {Overlay, OverlayProps} from '../overlay';
import {PaperProps, Paper} from '../paper';
import {Slide, SlideProps} from '../slide';

import * as styles from './drawer.module.css';

type TargetProps = PaperProps;
type TargetPropsFromOverlay = Pick<OverlayProps, 'open' | 'onClose' | 'onClosed'>;

/** Drawer public properties */
export interface Props
    extends TargetProps,
        TargetPropsFromOverlay,
        WithClasses<keyof typeof styles> {
    side?: 'left' | 'right';
    overlayProps?: Omit<OverlayProps, 'open' | 'onClose' | 'onClosed' | 'children'>;
    slideProps?: Omit<SlideProps, 'children' | 'direction' | 'in' | 'appear'>;
}

/**
 * Navigation drawers provide access to destinations in your app.
 * Side sheets are surfaces containing supplementary content
 * that are anchored to the left or right edge of the screen.
 */
export const Drawer = React.forwardRef<HTMLElement, Props>(function Drawer(props, ref) {
    const {
        open,
        onClose,
        onClosed,
        side = 'left',
        overlayProps = {},
        slideProps = {},
        classes,
        ...rest
    } = mergeClassesProps(props, styles);

    return (
        <Overlay
            {...overlayProps}
            open={open}
            onClose={onClose}
            onClosed={onClosed}
            className={classNames(overlayProps.className, classes.overlay)}
        >
            <Slide {...slideProps} appear in={open} direction={side}>
                <MarginBox
                    data-qa="drawer"
                    tabIndex={-1}
                    contained="in-dialog"
                    {...rest}
                    ref={ref}
                    as={Paper}
                    className={classNames(rest.className, classes.root, {
                        [classes.leftSided]: side === 'left',
                        [classes.rightSided]: side === 'right'
                    })}
                />
            </Slide>
        </Overlay>
    );
});
