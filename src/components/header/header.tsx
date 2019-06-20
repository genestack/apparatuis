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
import {Flex} from '../flex';
import {FIXED_BLOCKS_CLASS_NAME} from '../overlay/overlay-manager';

import * as styles from './header.module.css';

type TargetProps = React.HTMLAttributes<HTMLDivElement>;

/** Header public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /** Removes header bottom border */
    disableBorder?: boolean;
    /** Disable default header fixed position */
    disablePositionFixed?: boolean;
    /**
     * To shift main page content fixed header renders additional empty div (spacer).
     * This property disables this render.
     */
    disableStaticSpacer?: boolean;
    /** Properties for spacer element */
    staticSpacerProps?: React.HTMLAttributes<HTMLDivElement>;
}

/**
 * Header displays common information and actions related to the current screen.
 * It is used for branding, page title, navigation and actions.
 */
export const Header = (props: Props) => {
    const {
        disablePositionFixed,
        disableStaticSpacer,
        disableBorder,
        staticSpacerProps = {},
        classes,
        ...rest
    } = mergeClassesProps(props, styles);

    const spacer =
        !disableStaticSpacer && !disablePositionFixed ? (
            <div
                {...staticSpacerProps}
                className={classNames(staticSpacerProps.className, classes.spacer)}
            />
        ) : null;

    return (
        <React.Fragment>
            {spacer}
            <Flex container gap={0}>
                <div
                    {...rest}
                    className={classNames(classes.root, rest.className, {
                        [FIXED_BLOCKS_CLASS_NAME]: !disablePositionFixed,
                        [classes.fixed]: !disablePositionFixed,
                        [classes.withBorder]: !disableBorder
                    })}
                />
            </Flex>
        </React.Fragment>
    );
};
