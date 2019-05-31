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
    prepend?: React.ReactNode;
    append?: React.ReactNode;
    loading?: boolean;
    onClearButtonClick?: React.MouseEventHandler;
    value?: string;
    spinnerWrapperProps?: React.HTMLAttributes<HTMLDivElement>;
    spinnerProps?: SpinnerProps;
    closeButtonProps?: ButtonProps;
    standardAppendProps?: React.HTMLAttributes<HTMLDivElement>;
    rootProps?: React.HTMLAttributes<HTMLLabelElement>;
    rootRef?: React.Ref<HTMLLabelElement>;
    inputClassName?: string;
    prependProps?: React.HTMLAttributes<HTMLDivElement>;
    appendProps?: React.HTMLAttributes<HTMLDivElement>;
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
// tslint:disable-next-line: cyclomatic-complexity
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
        closeButtonProps = {},
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
    const spinnerState = useShownState();
    const closeButtonState = useShownState();
    const [invalidState, setInvalidState] = useState(invalid);

    useLayoutEffect(() => {
        if (inputRef.current) {
            setInvalidState(!inputRef.current.validity.valid);
        }
    });

    const spinner =
        loading || spinnerState.isShown ? (
            <Fade in={loading} appear onEnter={spinnerState.onShow} onExited={spinnerState.onHide}>
                <div
                    {...spinnerWrapperProps}
                    className={classNames(spinnerWrapperProps.className, classes.spinnerWrapper)}
                >
                    <Spinner size={SPINNER_SIZE} />
                </div>
            </Fade>
        ) : null;

    const handleCloseButtonClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const showClearButton = value && onClearButtonClick && !disabled && !readOnly;

    const clearButton =
        showClearButton || closeButtonState.isShown ? (
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
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        if (inputRef.current) {
            setInvalidState(!inputRef.current.validity.valid);
        }

        if (onValueChange) {
            onValueChange(event.currentTarget.value);
        }
    };

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

    const renderPrepend = () =>
        prepend ? (
            <div
                {...prependProps}
                className={classNames(prependProps.className, classes.prependWrapper)}
            >
                {prepend}
            </div>
        ) : null;

    const renderAppend = () =>
        append ? (
            <div
                {...appendProps}
                className={classNames(appendProps.className, classes.appendWrapper)}
            >
                {append}
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
                {renderPrepend()}
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
                {renderAppend()}
                {standardAppend}
            </label>
        </DarkContext.Provider>
    );
};
