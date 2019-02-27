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

interface Props {
    className?: string;
}

/**
 * Component adds common styles for `SVG` icons.
 * Should not be used standalone; only for defining certain icons.
 *
 * @visibleName Icon
 */
export function createIcon<P extends Props>(icon: React.SFC<P> | JSX.Element) {
    class SomeIcon extends React.PureComponent<P> {
        public render() {
            const element = typeof icon === 'function' ? icon(this.props) : icon;

            return element
                ? React.cloneElement(element, {
                      className: classNames(element.props.className, styles.root)
                  })
                : null;
        }
    }

    return SomeIcon;
}
