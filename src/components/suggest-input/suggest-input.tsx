/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import Downshift, {ControllerStateAndHelpers, StateChangeOptions} from 'downshift';
import * as React from 'react';

import {chain} from '../../utils/chain';
import {chainRefs} from '../../utils/set-ref';
import {SlotProps} from '../../utils/slot-props';
import {useControlledProp} from '../../utils/use-controlled-prop';
import {List} from '../list';
import {PopoverProps} from '../popover';
import {Suggest, SuggestProps} from '../suggest';

import * as styles from './styles.module.css';

/**
 * Suggest component get their children with no knowledge of Downshift under the hood. To
 * achieve this abstraction, we clone those children and enrich them with props, provided
 * by Downshift.
 */
function getSuggestInputChildren(
    children: React.ReactNode,
    downshift: ControllerStateAndHelpers<string>
) {
    let index = -1;

    return React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
            return child;
        }

        const childValue = child.props.value;
        // do not allow a child without value to be selected
        if (typeof childValue !== 'string') {
            return child;
        }

        index += 1;

        // `downshift.getItemProps` uses `AllHTMLProps` that are conflict with `SuggestInputItemProps`
        // we should omit the next properties:
        // `as` for <link /> elements
        // `wrap` for `<textarea />` elements
        const itemProps = {
            ...child.props,
            focused: downshift.highlightedIndex === index
        };

        return React.cloneElement(child, {
            ...downshift.getItemProps({
                ...itemProps,
                index,
                item: childValue
            })
        });
    });
}

type SuggestInputChildren = React.ReactNode | ((value?: string) => React.ReactNode[]);

/** SuggestInput public properties */
export interface Props extends Omit<SuggestProps, 'children'> {
    /** Open suggest when user focuses in input */
    openOnFocus?: boolean;
    /** Calls when user selects a suggested item */
    onComplete?: (value: string) => void;
    /** Calls when open state is changed */
    onOpenChange?: (open: boolean) => void;
    children?: SuggestInputChildren;
    listProps?: SlotProps<typeof List>;
}

/**
 * Binding Suggest implementation to
 * [downshift](https://github.com/downshift-js/downshift).
 *
 * It supports only string values.
 */
export const SuggestInput = React.forwardRef<HTMLElement, Props>(function SuggestInput(props, ref) {
    const {onComplete, openOnFocus, onOpenChange, listProps = {}, ...rest} = props;
    const [value, onValueChange] = useControlledProp(
        rest.value,
        rest.defaultValue || '',
        rest.onValueChange
    );
    const [isOpen, setIsOpen] = React.useState(false);
    const skipClick = React.useRef(false);
    const firstMount = React.useRef(true);

    React.useEffect(() => {
        if (!firstMount.current && onOpenChange) {
            onOpenChange(isOpen);
        }
        firstMount.current = false;
    }, [isOpen]);

    const handleSelect = (item: string | null) => {
        if (!item) {
            return;
        }

        if (rest.value === undefined) {
            onValueChange(item);
        }

        if (onComplete) {
            onComplete(item);
        }
    };

    const handleStateChange = (changes: StateChangeOptions<string>) => {
        if (changes.isOpen !== undefined) {
            setIsOpen(changes.isOpen);
        }
    };

    const handleInputFocus = () => {
        if (openOnFocus) {
            skipClick.current = true;
            setIsOpen(true);
        }
    };

    const handleInputClick = () => {
        if (!skipClick.current) {
            if (isOpen) {
                setIsOpen(false);
            } else if (openOnFocus) {
                setIsOpen(true);
            }
        }

        skipClick.current = false;
    };

    return (
        <Downshift onSelect={handleSelect} isOpen={isOpen} onStateChange={handleStateChange}>
            {(downshift: ControllerStateAndHelpers<string>) => {
                const {rootRef, ...rootProps} = downshift.getRootProps(
                    {refKey: 'rootRef'},
                    {suppressRefError: true}
                );

                const inputProps = downshift.getInputProps({
                    ...rest,
                    onFocus: chain(rest.onFocus, handleInputFocus),
                    onClick: chain(rest.onClick, handleInputClick)
                });

                const inputPopoverProps = inputProps.popoverProps || {};

                const children = isOpen
                    ? getSuggestInputChildren(
                          typeof rest.children === 'function'
                              ? rest.children(value)
                              : rest.children,
                          downshift
                      )
                    : null;

                const {menuRef, ...menuProps} = downshift.getMenuProps(
                    {refKey: 'menuRef'},
                    {suppressRefError: true}
                );

                const open = !!children;

                const popoverProps: PopoverProps = {
                    ...inputPopoverProps,
                    ...menuProps,
                    ref: chainRefs(
                        chainRefs(menuRef, inputPopoverProps.ref),
                        rest.popoverProps?.ref
                    ),
                    style: {
                        ...inputPopoverProps.style,
                        display: open ? 'block' : 'none'
                    }
                };

                // Downshift prevents default event behavior on Escape key down regardless the open state.
                // Ignore downshift keydown handler for properly work the suggest into dialogs.
                const handleInputKeyDown: SuggestProps['onKeyDown'] = (event) => {
                    if (!open && event.key === 'Escape') {
                        if (rest.onKeyDown) {
                            rest.onKeyDown(event);
                        }
                    } else {
                        if (inputProps.onKeyDown) {
                            inputProps.onKeyDown(event);
                        }
                    }
                };

                return (
                    <Suggest
                        data-qa="suggest-input"
                        {...inputProps}
                        onKeyDown={handleInputKeyDown}
                        value={value}
                        onValueChange={onValueChange}
                        rootProps={{
                            ...inputProps.rootProps,
                            ...rootProps
                        }}
                        popoverProps={popoverProps}
                        open={open}
                        ref={chainRefs(rootRef, ref)}
                    >
                        {open ? (
                            <List
                                data-qa="suggest-input-list"
                                {...listProps}
                                className={classNames(listProps.className, styles.list)}
                            >
                                {children}
                            </List>
                        ) : null}
                    </Suggest>
                );
            }}
        </Downshift>
    );
});
