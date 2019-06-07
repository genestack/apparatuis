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

function useUncontrolledProp<T>(
    value: T | undefined,
    onValueChange: ((value: T) => void) | undefined,
    defaultValue: T | undefined
) {
    const [state, setState] = useState(value === undefined ? defaultValue : value);

    const handleChange = (updatedValue: T) => {
        setState(updatedValue);
        if (onValueChange) {
            onValueChange(updatedValue);
        }
    };

    return {value: value === undefined ? state : value, onChange: handleChange};
}

function useInputInvalidity(
    inputRef: React.RefObject<HTMLInputElement>,
    invalid: boolean | undefined
) {
    // Input is valid by default
    const [invalidState, setInvalidState] = useState(invalid || false);

    // Use native input validation before browser paint
    useLayoutEffect(() => {
        if (inputRef.current) {
            setInvalidState(!inputRef.current.validity.valid);
        }
    });

    return invalid === undefined ? invalidState : invalid;
}

type TargetProps = React.InputHTMLAttributes<HTMLInputElement>;

/** Input public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /** If `true` input has invalid styles */
    invalid?: boolean;
    /** If `true` input has width: 100% */
    fullWidth?: boolean;
    /** Value of input */
    value?: string;
    /** Default value of uncontrolled input */
    defaultValue?: string;
    /** Custom change event handler */
    onValueChange?: (value: string) => void;
    /** React reference to native input */
    inputRef?: React.Ref<HTMLInputElement>;
    /** React elements that are prepended before text field */
    prepend?: React.ReactNode;
    /** React elements that are appended after text field */
    append?: React.ReactNode;
    /** Shows spinner */
    loading?: boolean;
    /** Shows clear button */
    clearable?: boolean;
    /** Shows clear button and calls on its click */
    onClearButtonClick?: React.MouseEventHandler;
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

/** Text field wrapped around input */
export const Input = (props: Props) => {
    const {
        invalid,
        fullWidth,
        onValueChange,
        inputRef: propInputRef,
        className,
        classes,
        style,
        prepend,
        append,
        loading,
        onClearButtonClick,
        spinnerWrapperProps = {},
        spinnerProps = {},
        clearButtonProps = {},
        rootProps = {},
        standardAppendProps = {},
        prependProps = {},
        appendProps = {},
        rootRef,
        inputClassName,
        inputStyle,
        value,
        defaultValue,
        clearable,
        ...rest
    } = mergeClassesProps(props, styles);

    const inputRef = useRef<HTMLInputElement>(null);
    // Simulate `:focus-within` because Edge does not support it
    const [focused, setFocused] = useState();
    const invalidState = useInputInvalidity(inputRef, invalid);
    const valueState = useUncontrolledProp(value, onValueChange, defaultValue || '');

    const renderSpinner = () => {
        const [isSpinnerExited, setSpinnerExited] = useState(true);

        return loading || !isSpinnerExited ? (
            <Fade
                in={loading}
                appear
                onEnter={() => {
                    setSpinnerExited(false);
                }}
                onExited={() => {
                    setSpinnerExited(true);
                }}
            >
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
        const [isClearButtonExited, setClearButtonExited] = useState(true);

        const showClearButton =
            valueState.value && clearable && !rest.disabled && !rest.readOnly && !loading;

        return showClearButton || !isClearButtonExited ? (
            <Fade
                in={!!showClearButton}
                appear
                onEnter={() => {
                    setClearButtonExited(false);
                }}
                onExited={() => {
                    setClearButtonExited(true);
                }}
            >
                <Button
                    tiny
                    variant="ghost"
                    icon={<ClearIcon />}
                    classes={{icon: classes.clearButtonIcon}}
                    {...clearButtonProps}
                    className={classNames(clearButtonProps.className, classes.clearButton)}
                    onClick={chain(clearButtonProps.onClick, onClearButtonClick, () => {
                        if (value === undefined || onClearButtonClick === undefined) {
                            valueState.onChange('');
                        }

                        if (inputRef.current) {
                            inputRef.current.focus();
                        }
                    })}
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
                onFocus={chain(rootProps.onFocus, () => {
                    setFocused(true);
                })}
                onBlur={chain(rootProps.onBlur, () => {
                    setFocused(false);
                })}
                className={classNames(classes.root, rootProps.className, className, {
                    [classes.fullWidth]: fullWidth,
                    [classes.withPrepend]: !!prepend,
                    [classes.withAppend]: !!standardAppend || !!append,
                    [classes.invalid]: invalidState,
                    [classes.disabled]: rest.disabled,
                    [classes.focused]: focused
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
                    ref={chainRefs(propInputRef, inputRef)}
                    style={inputStyle}
                    className={classNames(inputClassName, classes.input)}
                    value={valueState.value}
                    onChange={chain(rest.onChange, (event) => {
                        valueState.onChange(event.target.value);
                    })}
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
