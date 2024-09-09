/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {chainRefs} from '../../utils/set-ref';
import {Input, InputProps} from '../input';
import {PaperProps} from '../paper';
import {Popover, PopoverProps} from '../popover';
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
    popoverProps?: Omit<PopoverProps, 'referenceElement' | 'open'> & {ref?: React.Ref<HTMLElement>};
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
export const Suggest = React.forwardRef<HTMLElement, Props>(function Suggest(props, ref) {
    const {open, popoverProps = {}, children, ...rest} = props;
    const {containerProps = {}} = popoverProps;

    const inputRootRef = React.useRef<HTMLElement>(null);
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
                data-qa="suggest"
                {...rest}
                className={classNames(rest.className, styles.root)}
                ref={chainRefs(ref, inputRootRef)}
            />
            <Popover
                data-qa="suggest-popover"
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
});
