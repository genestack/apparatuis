/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {Omit} from '../../utils/omit';
import {SlotProps} from '../../utils/slot-props';
import {WithClasses, mergeClassesProps} from '../../utils/styles';
import {InteractiveElement, InteractiveElementProps} from '../interactive-element';
import {MarginBoxContext} from '../margin-box/margin-box-context';
import {TypographyProps, Typography} from '../typography';

import * as styles from './list-item.module.css';

type TargetProps = Omit<InteractiveElementProps, 'activeClassName'>;

/** ListItem public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /**
     * If `true` list item becomes an element like a button
     * (uses `BaseButton` under the hood).
     * It has interactive states (hover, active, focused etc.).
     */
    interactive?: boolean;
    /**
     * Left element for a menu item.
     * Anyway If no prepend passed a menu item will have empty left margin
     * for menu items align.
     */
    prepend?: React.ReactNode;
    /** Right element for a menu item. */
    append?: React.ReactNode;
    /** Small caption below the main title */
    subtitle?: React.ReactNode;
    /** Toggle title wrapping */
    wrap?: boolean;
    /** If `true` element has `pressed` style. */
    active?: boolean;
    /** If `true` element has `hover` style. */
    hovered?: boolean;
    /** If `true` element has `focused` style. */
    focused?: boolean;
    /**
     * If `true` element has `disabled` style.
     * This state just remove mouse pointer events and adds opacity to whole item.
     * To fully disable (focus events) inputs or buttons inside item
     * you should pass `disabled` property certain to contained elements.
     */
    disabled?: boolean;
    /**
     * If `true`, the component is disabled but allows cursor interactions such as mouse hover (for tooltips) and focus.
     * @default false
     */
    inclusiveDisabled?: boolean;
    /** Properties for wrapper of prepend element */
    prependProps?: SlotProps<'div'>;
    /** Properties for wrapper of append element */
    appendProps?: SlotProps<'div'>;
    /** Properties for wrapper of content element */
    contentProps?: SlotProps<'div'>;
    /** Properties for wrapper of title element */
    titleProps?: SlotProps<'div'>;
    /** Properties for wrapper of children */
    titleContentProps?: TypographyProps;
    /** Properties for wrapper of subtitle element */
    subtitleProps?: SlotProps<'div'>;
}

/**
 * Single item of List component
 */
export const ListItem = React.forwardRef((props: Props, ref) => {
    const {
        as: Component,
        classes,
        interactive,
        prepend,
        append,
        subtitle,
        wrap,
        active,
        hovered,
        focused,
        disabled,
        inclusiveDisabled = false,
        className,
        prependProps = {},
        appendProps = {},
        contentProps = {},
        titleProps = {},
        titleContentProps = {},
        subtitleProps = {},
        children,
        ...rest
    } = mergeClassesProps(props, styles);

    const contained = React.useContext(MarginBoxContext);

    const BaseComponent =
        typeof Component === 'undefined'
            ? typeof rest.href === 'undefined'
                ? 'li'
                : 'a'
            : Component;

    const RenderComponent = interactive ? InteractiveElement : BaseComponent;
    const renderComponentProps = interactive
        ? {as: BaseComponent, activeClassName: classes.active, inclusiveDisabled}
        : {};

    return (
        <RenderComponent
            data-qa="list-item"
            {...rest}
            {...renderComponentProps}
            disabled={disabled}
            className={classNames(className, classes.root, {
                [classes.interactive]: interactive,
                [classes.focused]: focused,
                [classes.hovered]: hovered,
                [classes.disabled]: disabled,
                // FIXME: Prevent click if `interactive` and `inclusiveDisabled`
                // https://genestack.atlassian.net/browse/ODM-6993
                [classes.inclusiveDisabled]: inclusiveDisabled,
                [classes.active]: active,
                [classes.inPage]: contained === 'in-page',
                [classes.inDialog]: contained === 'in-dialog'
            })}
            ref={ref}
        >
            {prepend ? (
                <div
                    {...prependProps}
                    className={classNames(prependProps.className, classes.prepend)}
                >
                    {prepend}
                </div>
            ) : null}
            <div {...contentProps} className={classNames(contentProps.className, classes.content)}>
                <div {...titleProps} className={classNames(titleProps.className, classes.title)}>
                    <Typography
                        ellipsis={!wrap}
                        as="div"
                        {...titleContentProps}
                        className={classNames(titleContentProps.className, classes.titleContent)}
                    >
                        {children}
                    </Typography>
                    {append ? (
                        <div
                            {...appendProps}
                            className={classNames(appendProps.className, classes.append)}
                        >
                            {append}
                        </div>
                    ) : null}
                </div>
                {subtitle ? (
                    <Typography
                        variant="caption"
                        intent="quiet"
                        as="div"
                        {...subtitleProps}
                        className={classNames(subtitleProps.className, classes.subtitle)}
                    >
                        {subtitle}
                    </Typography>
                ) : null}
            </div>
        </RenderComponent>
    );
});
