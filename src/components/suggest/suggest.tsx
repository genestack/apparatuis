/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {chain} from '../../utils/chain';
import {Omit} from '../../utils/omit';
import {chainRefs} from '../../utils/set-ref';
import {InputProps, Input} from '../input';
import {PaperProps} from '../paper';
import {PopoverProps, Popover} from '../popover';
import {TransitionPopper} from '../transition-popper';

import * as styles from './suggest.module.css';

function useElementWidth(element: HTMLElement | null) {
    const [width, setWidth] = React.useState<number | null>(null);

    React.useEffect(() => {
        if (element) {
            const nextWidth = element.getBoundingClientRect().width;
            if (nextWidth !== width) {
                setWidth(nextWidth);
            }
        }
    });

    return width;
}

/** Suggest public properties */
export interface Props extends InputProps {
    /** if `true` popover is shown */
    open?: boolean;
    /** properties passed to the `Popover` element */
    popoverProps?: Omit<PopoverProps, 'referenceElement' | 'open'>;
    /** children of the `Popover` element */
    children?: React.ReactNode;
}

/**
 * Just a wrapper component over `Input` and `Popover` that takes the responsibility
 * over styles and transitions. It is useless in common cases without any control components
 * like [downshift](https://github.com/downshift-js/downshift).
 *
 * Wrap it with your controller or use some predefined components like `SuggestInput`.
 */
export function Suggest(props: Props) {
    const {rootRef, open, popoverProps = {}, children, ...rest} = props;
    const {containerProps = {}} = popoverProps;

    const inputRootRef = React.useRef<HTMLLabelElement>(null);
    const inputRootWidth = useElementWidth(inputRootRef.current);

    const popperRef = React.useRef<TransitionPopper<PaperProps>>(null);

    React.useEffect(() => {
        if (popperRef.current) {
            popperRef.current.scheduleUpdate();
        }
    });

    return (
        <React.Fragment>
            <Input
                {...rest}
                rootRef={chainRefs(rootRef, inputRootRef)}
                className={classNames(rest.className, styles.root)}
            />
            <Popover
                placement="bottom-start"
                roundCorners
                {...popoverProps}
                popperRef={chainRefs(popoverProps.popperRef, popperRef)}
                open={open}
                referenceElement={inputRootRef.current}
                style={{...popoverProps.style, minWidth: `${inputRootWidth || 0}px`}}
                className={classNames(popoverProps.className, styles.popover)}
                containerProps={{
                    ...containerProps,
                    className: classNames(containerProps.className, styles.popoverContainer)
                }}
            >
                {children}
            </Popover>
        </React.Fragment>
    );
}
