/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import * as styles from './icon.module.css';

/** Common properties for all icons */
export type Props = React.SVGAttributes<SVGElement>;

/**
 * Component adds common styles for `SVG` icons.
 * Should not be used standalone; only for defining certain icons.
 *
 * Use global classNames to colorize SVG icons (`.gs-svg-icon-fill`, `.gs-svg-icon-stroke`).
 * CSS Modules does not provide handy way to redefine CSS properties by context.
 * So this global classes are added.
 *
 * Add `.gs-svg-icon-fill` to any SVG element in your icon to change `fill` color
 * or `.gs-svg-icon-stroke` to change `stroke` color.
 *
 * ```ts
 * const MyIcon = createIcon(<svg><path className="gs-svg-icon-fill" /></svg>);
 * ```
 *
 * ```css
 * .my-icon :global(.gs-svg-icon-fill) {
 *   fill: red;
 * }
 * ```
 */
export function createIcon<P extends Props = Props>(
    icon: React.FunctionComponent<P> | React.ReactElement
) {
    return class Icon extends React.PureComponent<P> {
        public render() {
            const element = typeof icon === 'function' ? icon(this.props) : icon;

            if (!element) {
                return null;
            }

            const {className} = element.props;

            return React.cloneElement(element, {
                'data-qa': 'icon',
                // prevent IE11 to focus SVG
                focusable: 'true',
                ...this.props,
                className: classNames(className, this.props.className, styles.root)
            });
        }
    };
}
