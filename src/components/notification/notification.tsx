/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {CrossIcon} from '../../icons/cross-icon';
import {chain} from '../../utils/chain';
import {WithClasses, mergeClassesProps} from '../../utils/styles';
import {ButtonProps, Button} from '../button';
import {CircularCountdown} from '../circular-countdown';
import {Divider} from '../divider';
import {Paper} from '../paper';

import * as styles from './notification.module.css';

const DEFAULT_AUTO_CLOSE_DURATION = 6000;

type TargetProps = React.HTMLAttributes<HTMLDivElement>;

/** Notification close reason */
export type NotificationCloseReason = 'countdown-timeout' | 'close-button-click';

/** Notification public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /** Is called when notification is closed */
    onClose?: (reason: NotificationCloseReason) => void;
    /** Notification closes after this timeout duration */
    countdownDuration?: number;
    /** State of countdown */
    countdown?: 'active' | 'stopped' | 'none';
    /** Close button properties */
    closeButtonProps?: ButtonProps;
}

interface State {
    closing: boolean;
}

/**
 * A notifications are used to inform user about application state changes,
 * status update or error. A brief feedback on actions that an app
 * has performed or performing now. It should be structured as short,
 * succinct messages and could provide optional action.
 */
export class Notification extends React.Component<Props, State> {
    private handleCloseButtonClick = () => {
        if (this.props.onClose) {
            this.props.onClose('close-button-click');
        }
    };

    private handleCountdownComplete = () => {
        if (this.props.onClose) {
            this.props.onClose('countdown-timeout');
        }
    };

    public render() {
        const {
            closeButtonProps = {},
            countdownDuration = DEFAULT_AUTO_CLOSE_DURATION,
            onClose,
            classes,
            children,
            countdown = 'active',
            ...rest
        } = mergeClassesProps(this.props, styles);

        const {contentProps: closeButtonContentProps = {}} = closeButtonProps;

        const closeButton = (
            <Button
                variant="ghost"
                wrap
                {...closeButtonProps}
                contentProps={{
                    ...closeButtonContentProps,
                    className: classNames(
                        closeButtonContentProps.className,
                        classes.closeButtonContent
                    )
                }}
                className={classNames(closeButtonProps.className, classes.closeButton)}
                onClick={chain(closeButtonProps.onClick, this.handleCloseButtonClick)}
            >
                <CrossIcon />
                {countdown !== 'none' ? (
                    <CircularCountdown
                        in={countdown === 'active'}
                        className={styles.circularProgress}
                        onComplete={this.handleCountdownComplete}
                        duration={countdownDuration}
                        transitionProps={{appear: true}}
                    />
                ) : null}
            </Button>
        );

        return (
            <Paper {...rest} className={classNames(rest.className, classes.root)}>
                <Divider variant="transparent" startGap={0} endGap={2} />

                {children}
                {closeButton}

                <Divider variant="transparent" startGap={2} endGap={0} />
            </Paper>
        );
    }
}
