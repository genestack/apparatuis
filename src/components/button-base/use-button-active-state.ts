/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

const SPACE_KEY = ' ';

interface Props {
    disableHook?: boolean;
    /**
     * Calls on space keyup event in active state.
     * We could not use mouse event handler because original event is keyboard event.
     */
    onClick?: React.ReactEventHandler;
}

/** Event handlers that should be applied to element */
interface EventHandlers {
    onMouseDown?: React.MouseEventHandler;
    onKeyDown?: React.KeyboardEventHandler;
    onKeyUp?: React.KeyboardEventHandler;
}

/** Hook to simulate button pressing behaviour */
export function useButtonActiveState(props: Props) {
    const [active, setActiveState] = React.useState(false);

    function subscribeToWindowMouseUp() {
        if (active) {
            const handleWindowMouseUp = () => {
                setActiveState(false);
            };

            window.addEventListener('mouseup', handleWindowMouseUp);

            return () => {
                window.removeEventListener('mouseup', handleWindowMouseUp);
            };
        }
    }

    function getEventHandlers(): EventHandlers {
        if (props.disableHook) {
            // no handlers needed when hook is disabled
            return {};
        }

        return {
            onMouseDown: (event) => {
                if (!event.defaultPrevented && !active) {
                    setActiveState(true);
                }
            },

            onKeyDown: (event) => {
                if (
                    !event.defaultPrevented &&
                    event.target === event.currentTarget &&
                    event.key === SPACE_KEY
                ) {
                    // stops scrolling on space press
                    event.preventDefault();
                    if (!active) {
                        setActiveState(true);
                    }
                }
            },

            onKeyUp: (event) => {
                if (
                    !event.defaultPrevented &&
                    event.target === event.currentTarget &&
                    event.key === SPACE_KEY &&
                    active
                ) {
                    setActiveState(false);

                    // simulate on click when target is not button
                    if (props.onClick && !(event.target instanceof HTMLButtonElement)) {
                        props.onClick(event);
                    }
                }
            }
        };
    }

    React.useEffect(subscribeToWindowMouseUp, [active]);

    const callbackProps = React.useMemo(getEventHandlers, [
        active,
        props.disableHook,
        props.onClick
    ]);

    return {active, ...callbackProps};
}
