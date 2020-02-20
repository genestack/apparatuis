/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
// tslint:disable: no-magic-numbers
import classNames from 'classnames';
import * as React from 'react';

import {WithClasses, mergeClassesProps} from '../../utils/styles';

import * as styles from './spinner.module.css';

const DEFAULT_SIZE = 16;

type TargetProps = React.SVGAttributes<SVGSVGElement>;

/** Spinner public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /** Diameter of spinner in pixels */
    size?: number;
    /** Width of spinner stroke */
    strokeWidth?: number;
    /** Do not show background spinner circle */
    hideBackgroundCircle?: boolean;
    /** Properties for the main SVG circle element */
    circleProps?: React.SVGAttributes<SVGCircleElement>;
    /** Properties for the background SVG circle element */
    backgroundCircleProps?: React.SVGAttributes<SVGCircleElement>;
}

const getDefaultStokeWidth = ({size = DEFAULT_SIZE}: Props) => size / 8;

/** Shows to user intermediate process */
export const Spinner = (props: Props) => {
    const {
        size = DEFAULT_SIZE,
        strokeWidth = getDefaultStokeWidth(props),
        hideBackgroundCircle,
        circleProps = {},
        backgroundCircleProps = {},
        classes,
        ...rest
    } = mergeClassesProps(props, styles);

    const radius = (size - strokeWidth) / 2;
    const perimeter = radius * 2 * Math.PI;
    const center = size / 2;
    const sectorLength = perimeter / 10;

    return (
        <svg
            data-qa="spinner"
            viewBox={`0 0 ${size} ${size}`}
            style={{width: size, height: size}}
            {...rest}
            className={classNames(rest.className, classes.root)}
        >
            {!hideBackgroundCircle ? (
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    strokeWidth={strokeWidth}
                    {...backgroundCircleProps}
                    className={classNames(
                        backgroundCircleProps.className,
                        classes.backgroundCircle
                    )}
                />
            ) : null}
            <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                strokeLinecap="round"
                strokeWidth={strokeWidth}
                strokeDasharray={`${sectorLength * 3} ${sectorLength * 2}`}
                {...circleProps}
                className={classNames(circleProps.className, classes.circle)}
            />
        </svg>
    );
};
