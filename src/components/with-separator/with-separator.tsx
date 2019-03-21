/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import * as React from 'react';

/** WithSeparator public properties */
export interface Props {
    separator?: React.ReactNode;
    children: React.ReactNode;
}

/** With Separator */
export const WithSeparator = (props: Props) => {
    const children = React.Children.toArray(props.children).reduce<React.ReactNode[]>(
        (result, child, index, arr) => {
            result.push(child);

            if (index < arr.length - 1) {
                if (React.isValidElement(props.separator)) {
                    result.push(
                        React.cloneElement(props.separator, {
                            key: `separator-${index}`
                        })
                    );
                } else {
                    result.push(props.separator);
                }
            }

            return result;
        },
        []
    );

    return <React.Fragment>{children}</React.Fragment>;
};
