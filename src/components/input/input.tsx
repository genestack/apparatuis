/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import classNames from 'classnames';
import React, {useState, useRef, useLayoutEffect} from 'react';

import {ClearIcon} from '../../icons/clear-icon';
import {chain} from '../../utils/chain';
import {DarkContext} from '../../utils/dark-context';
import {chainRefs} from '../../utils/set-ref';
import {WithClasses, mergeClassesProps} from '../../utils/styles';
import {Button, ButtonProps} from '../button';
import {Fade} from '../fade';
import {Spinner, SpinnerProps} from '../spinner';

import * as styles from './input.module.css';

const SPINNER_SIZE = 16;

type TargetProps = React.InputHTMLAttributes<HTMLInputElement>;

/** Input public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /** If `true` input has invalid styles */
    invalid?: boolean;
    /** If `true` input has width: 100% */
    fullWidth?: boolean;
    /** Custom change event handler */
    onValueChange?: (value: string) => void;
    /** React reference to native input */
    inputRef?: React.Ref<HTMLInputElement>;
    /** React elements that are inserter before text field */
    prepend?: React.ReactNode;
    /** React elements that are inserter after text field */
    append?: React.ReactNode;
    /** Shows spinner */
    loading?: boolean;
    /** Shows clear button and calls on its click */
    onClearButtonClick?: React.MouseEventHandler;
    /** Value of input */
    value?: string;
    /** Properties of the spinner element */
    spinnerProps?: SpinnerProps;
    /** Properties of the spinner wrapper element */
    spinnerWrapperProps?: React.HTMLAttributes<HTMLDivElement>;
    /** Properties of the clear button */
    clearButtonProps?: ButtonProps;
    /** Standard `append` element contains spinner and clear button */
    standardAppendProps?: React.HTMLAttributes<HTMLDivElement>;
    /**
     * Properties of the root element that contains
     * the target input element.
     */
    rootProps?: React.HTMLAttributes<HTMLLabelElement>;
    /** Ref to the root element */
    rootRef?: React.Ref<HTMLLabelElement>;
    /** Properties of the prepend elements wrapper */
    prependProps?: React.HTMLAttributes<HTMLDivElement>;
    /** Properties of the append elements wrapper */
    appendProps?: React.HTMLAttributes<HTMLDivElement>;
    /** ClassName that is passed to the target input */
    inputClassName?: string;
    /** Style that is passed to the target input */
    inputStyle?: React.CSSProperties;
}

const useShownState = () => {
    const [isShown, setShown] = React.useState(false);

    return {
        isShown,
        onShow: () => {
            setShown(true);
        },
        onHide: () => {
            setShown(false);
        }
    };
};

/** Input wrapper */
export const Input = (props: Props) => {
    const {
        invalid,
        disabled,
        readOnly,
        fullWidth,
        onValueChange,
        inputRef: propInputRef,
        className,
        classes,
        style,
        prepend,
        append,
        loading,
        value,
        onClearButtonClick,
        spinnerWrapperProps = {},
        spinnerProps = {},
        clearButtonProps: closeButtonProps = {},
        rootProps = {},
        standardAppendProps = {},
        prependProps = {},
        appendProps = {},
        rootRef,
        inputClassName,
        inputStyle,
        ...rest
    } = mergeClassesProps(props, styles);

    const inputRef = useRef<HTMLInputElement>(null);
    const [invalidState, setInvalidState] = useState(invalid);

    useLayoutEffect(() => {
        if (inputRef.current) {
            setInvalidState(!inputRef.current.validity.valid);
        }
    });

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        if (inputRef.current) {
            setInvalidState(!inputRef.current.validity.valid);
        }

        if (onValueChange) {
            onValueChange(event.currentTarget.value);
        }
    };

    const renderSpinner = () => {
        const spinnerState = useShownState();

        return loading || spinnerState.isShown ? (
            <Fade in={loading} appear onEnter={spinnerState.onShow} onExited={spinnerState.onHide}>
                <div
                    {...spinnerWrapperProps}
                    className={classNames(spinnerWrapperProps.className, classes.spinnerWrapper)}
                >
                    <Spinner size={SPINNER_SIZE} {...spinnerProps} />
                </div>
            </Fade>
        ) : null;
    };

    const renderClearButton = () => {
        const closeButtonState = useShownState();

        const handleCloseButtonClick = () => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        };

        const showClearButton = value && onClearButtonClick && !disabled && !readOnly && !loading;

        return showClearButton || closeButtonState.isShown ? (
            <Fade
                in={!!showClearButton}
                appear
                onEnter={closeButtonState.onShow}
                onExited={closeButtonState.onHide}
            >
                <Button
                    tiny
                    variant="ghost"
                    icon={<ClearIcon />}
                    classes={{icon: classes.clearButtonIcon}}
                    {...closeButtonProps}
                    className={classNames(closeButtonProps.className, classes.clearButton)}
                    onClick={chain(
                        closeButtonProps.onClick,
                        handleCloseButtonClick,
                        onClearButtonClick
                    )}
                />
            </Fade>
        ) : null;
    };

    const spinner = renderSpinner();
    const clearButton = renderClearButton();

    const standardAppend =
        spinner || clearButton ? (
            <div
                {...standardAppendProps}
                className={classNames(standardAppendProps.className, classes.standardAppend)}
            >
                {clearButton}
                {spinner}
            </div>
        ) : null;

    return (
        <DarkContext.Provider value={false}>
            <label
                ref={rootRef}
                style={style}
                {...rootProps}
                className={classNames(classes.root, rootProps.className, className, {
                    [classes.fullWidth]: fullWidth,
                    [classes.withPrepend]: !!prepend,
                    [classes.withAppend]: !!standardAppend || !!append,
                    [classes.invalid]: invalid !== undefined ? invalid : invalidState,
                    [classes.disabled]: disabled
                })}
            >
                {prepend ? (
                    <div
                        {...prependProps}
                        className={classNames(prependProps.className, classes.prependWrapper)}
                    >
                        {prepend}
                    </div>
                ) : null}
                <input
                    {...rest}
                    value={value}
                    disabled={disabled}
                    readOnly={readOnly}
                    ref={chainRefs(propInputRef, inputRef)}
                    style={inputStyle}
                    className={classNames(inputClassName, classes.input)}
                    onChange={chain(rest.onChange, handleChange)}
                />
                {standardAppend}
                {append ? (
                    <div
                        {...appendProps}
                        className={classNames(appendProps.className, classes.appendWrapper)}
                    >
                        {append}
                    </div>
                ) : null}
            </label>
        </DarkContext.Provider>
    );
};
