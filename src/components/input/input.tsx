/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {chain} from '../../utils/chain';
import {chainRefs} from '../../utils/set-ref';
import {DataAttributes, SlotProps} from '../../utils/slot-props';
import {mergeClassesProps, WithClasses} from '../../utils/styles';
import {useInputInvalidity} from '../../utils/use-input-invalidity';
import {Field, FieldProps} from '../field';

import {InputClearButton, Props as InputClearButtonProps} from './input-clear-button';
import {InputSpinner, Props as InputSpinnerProps} from './input-spinner';
import * as styles from './input.module.css';

type BaseTargetProps = React.ComponentPropsWithoutRef<'input'>;
type BaseRootProps = React.ComponentPropsWithoutRef<'div'>;

/** Properties that are exchanged between input and its wrapper (root element) */
type ExchangedProps =
    | 'className'
    | 'style'
    // this properties required for tooltip handler
    | 'onMouseEnter'
    | 'onMouseLeave'
    | 'onFocus'
    | 'onBlur';

type TargetProps = Omit<BaseTargetProps, ExchangedProps>;
type RootProps = Pick<BaseRootProps, ExchangedProps> &
    Omit<FieldProps, 'classes'> &
    WithClasses<keyof typeof styles>;

type OtherTargetProps = Pick<BaseTargetProps, ExchangedProps>;
type OtherRootProps = Omit<BaseRootProps, ExchangedProps> &
    Pick<FieldProps, 'classes'> &
    DataAttributes;

/** Input public properties */
export interface Props extends TargetProps, RootProps {
    /** Shows spinner */
    loading?: boolean;
    /**
     * Shows clear button. Input is stateless component,
     * so if you want to use clear button save value state yourself.
     */
    clearable?: boolean;
    /** React elements that are prepended before text field */
    prepend?: React.ReactNode;
    /** React elements that are appended after text field */
    append?: React.ReactNode;
    /** Value of input */
    value?: string;
    /** Default value of uncontrolled input */
    defaultValue?: string;
    /** Custom change event handler */
    onValueChange?: (value: string) => void;
    /** Calls when user clicks to clear button */
    onClearButtonClick?: () => void;
    /**
     * Properties for root wrapper element.
     * Some properties like styles or mouse listeners from a root level
     * of properties are passed to this wrapper not to input.
     * @see ExchangedProps
     */
    rootProps?: OtherRootProps;
    /**
     * The rest properties for native input element that could not be passed
     * to a root level of properties.
     * @see ExchangedProps
     */
    inputProps?: OtherTargetProps;
    /** Ref to native input element */
    inputRef?: React.Ref<HTMLInputElement>;
    /** Properties for input wrapper element */
    inputCellProps?: SlotProps<'div'>;
    /** Properties for prepend wrapper element */
    prependCellProps?: SlotProps<'div'>;
    /** Properties for append wrapper element */
    appendCellProps?: SlotProps<'div'>;
    /**
     * Properties for helpers wrapper element.
     * Helpers help user to see and to manage state of input
     * like loading or clear value button.
     */
    helpersProps?: SlotProps<'div'>;
    /** Properties for clear button */
    clearButtonProps?: InputClearButtonProps;
    /** Properties for loading spinner */
    spinnerProps?: InputSpinnerProps;
}

/**
 * Base input field is used for data that could be entered into field within keyboard
 * like `text`, `email`, `password` etc.
 *
 * This component is stateless.
 */
export const Input = React.forwardRef<HTMLDivElement, Props>(function Input(props, ref) {
    const {
        className,
        style,
        onMouseEnter,
        onMouseLeave,
        onFocus,
        onBlur,
        invalid,
        loading,
        clearable,
        classes,
        onClearButtonClick,
        inputProps: otherInputProps,
        rootProps: otherFieldProps = {},
        prepend,
        prependCellProps = {},
        append,
        appendCellProps = {},
        inputCellProps = {},
        helpersProps = {},
        onValueChange,
        clearButtonProps,
        spinnerProps,
        fullWidth,
        inputRef: innerInputRef,
        ...rest
    } = mergeClassesProps(props, styles);

    const {tabIndex: fieldTabIndex = -1, ...fieldProps} = otherFieldProps;
    const inputProps: BaseTargetProps = {...rest, ...otherInputProps};
    const inputRef = React.useRef<HTMLInputElement>(null);

    // add input paddings for placing helpers elements like loader or clear button
    const withHelpers = typeof loading === 'boolean' || clearable;

    // simulate :focus-within css selector because of IE11
    const [focused, setFocused] = React.useState(false);

    // use native input attribute to highlight invalid field with css
    const invalidState = useInputInvalidity(inputRef, invalid);

    // simulate native html label element behaviour to prevent flickering
    // focused styles while clicking outside input but into field element
    const handleFieldFocus: React.FocusEventHandler = (event) => {
        if (event.target === event.currentTarget && inputRef.current) {
            inputRef.current.focus();
        }

        setFocused(true);
    };

    const handleFieldBlur: React.FocusEventHandler = () => {
        setFocused(false);
    };

    // https://github.com/facebook/react/issues/9142
    React.useEffect(() => {
        if (props.disabled) {
            setFocused(false);
        }
    }, [props.disabled]);

    const handleInputChange = chain(
        inputProps.onChange,
        onValueChange &&
            ((event: React.ChangeEvent<HTMLInputElement>) => {
                if (onValueChange) {
                    onValueChange(event.target.value);
                }
            })
    );

    const handleClearButtonClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <Field
            data-qa="input-field"
            tabIndex={!inputProps.disabled ? fieldTabIndex : undefined}
            className={classNames(className, classes.root)}
            style={style}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onFocus={chain(handleFieldFocus, onFocus)}
            onBlur={chain(handleFieldBlur, onBlur)}
            focused={focused}
            invalid={invalidState}
            disabled={inputProps.disabled}
            fullWidth={fullWidth}
            {...fieldProps}
            ref={ref}
        >
            {prepend ? (
                <div
                    {...prependCellProps}
                    className={classNames(prependCellProps.className, classes.prependCell)}
                >
                    {prepend}
                </div>
            ) : null}
            <div
                {...inputCellProps}
                className={classNames(inputCellProps.className, classes.inputCell)}
            >
                <input
                    data-qa="input"
                    ref={chainRefs(innerInputRef, inputRef)}
                    {...inputProps}
                    className={classNames(classes.input, inputProps.className, {
                        [classes.withHelpers]: withHelpers
                    })}
                    onChange={handleInputChange}
                />
                {withHelpers ? (
                    <div
                        {...helpersProps}
                        className={classNames(helpersProps.className, classes.helpers)}
                    >
                        <InputSpinner
                            {...spinnerProps}
                            show={loading}
                            className={classes.spinner}
                        />
                        <InputClearButton
                            {...clearButtonProps}
                            show={
                                clearable &&
                                !inputProps.disabled &&
                                !inputProps.readOnly &&
                                !loading
                            }
                            onClick={chain(onClearButtonClick, handleClearButtonClick)}
                            className={classes.clearButton}
                        />
                    </div>
                ) : null}
            </div>
            {append ? (
                <div
                    {...appendCellProps}
                    className={classNames(appendCellProps.className, classes.appendCell)}
                >
                    {append}
                </div>
            ) : null}
        </Field>
    );
});
