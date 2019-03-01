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

type TargetProps = React.SVGAttributes<React.ReactSVGElement>;

/**
 * Component adds common styles for `SVG` icons.
 * Should not be used standalone; only for defining certain icons.
 *
 * @visibleName Icon
 */
export function createIcon<P extends TargetProps = TargetProps>(icon: React.SFC<P> | JSX.Element) {
    class Icon extends React.PureComponent<P> {
        public render() {
            if (typeof icon === 'function') {
                const element = icon(this.props);

                return element
                    ? React.cloneElement(element, {
                          className: classNames(element.props.className, styles.root)
                      })
                    : null;
            }

            return React.cloneElement(icon, {
                className: classNames(icon.props.className, this.props.className, styles.root)
            });
        }
    }

    return Icon;
}
