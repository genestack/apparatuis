/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import * as React from 'react';

import {Dialog, Props as DialogProps} from './dialog';
import {DialogBody} from './dialog-body';
import {DialogFooter} from './dialog-footer';
import {DialogFullWidth} from './dialog-full-width';
import {DialogHeader} from './dialog-header';

describe('<Dialog />', () => {
    const setup = (props?: Partial<DialogProps>) =>
        render(
            <Dialog
                data-testid="dialog"
                open
                {...props}
                containerProps={{'data-testid': 'container', ...props?.containerProps}}
                closeButtonProps={{'data-testid': 'close-button', ...props?.closeButtonProps}}
                overlayProps={{'data-testid': 'overlay', ...props?.overlayProps}}
            >
                <DialogHeader data-testid="dialog-header" />
                <DialogBody data-testid="dialog-body">
                    <DialogFullWidth data-testid="full-width" />
                </DialogBody>
                <DialogFooter data-testid="dialog-footer" />
            </Dialog>
        );

    it('should focus self when opened', () => {
        const screen = setup();
        expect(screen.queryByTestId('dialog')).toHaveFocus();
    });

    it('should not focus self when closed', () => {
        setup({open: false});
        expect(document.activeElement).toBe(document.body);
    });

    it('should render <Overlay />', () => {
        expect(setup().queryByTestId('overlay')).toBeVisible();
    });

    it('should render header', () => {
        expect(setup().queryByTestId('dialog-header')).toBeVisible();
    });

    it('should render body', () => {
        expect(setup().queryByTestId('dialog-body')).toBeVisible();
    });

    it('should render footer', () => {
        expect(setup().queryByTestId('dialog-footer')).toBeVisible();
    });

    it('should render full width component', () => {
        expect(setup().queryByTestId('full-width')).toBeVisible();
    });

    it('should render container', () => {
        expect(setup().queryByTestId('container')).toBeVisible();
    });

    it('should close dialog by container click', () => {
        const onClose = jest.fn();
        const screen = setup({onClose});
        const container = screen.queryByTestId('container')!;
        fireEvent.mouseDown(container);
        fireEvent.click(container);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should not close dialog if click starts not in a container', () => {
        const onClose = jest.fn();
        const screen = setup({onClose});
        const container = screen.queryByTestId('container')!;
        const dialogBody = screen.queryByTestId('dialog-body')!;
        fireEvent.mouseDown(dialogBody);
        fireEvent.click(container);
        expect(onClose).not.toBeCalled();
    });

    it('should render close button', () => {
        expect(setup().queryByTestId('close-button')).toBeVisible();
    });

    it('should not render close button if hideCloseButton passed', () => {
        expect(setup({hideCloseButton: true}).queryByTestId('close-button')).toBeFalsy();
    });

    it('should close dialog by close button click', () => {
        const onClose = jest.fn();
        const screen = setup({onClose});

        fireEvent.click(screen.queryByTestId('close-button')!);

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should not close dialog on backdrop click when overlayProps.disableClickListener = true', () => {
        const onClose = jest.fn();
        const screen = setup({onClose, overlayProps: {disableClickListener: true}});
        const container = screen.queryByTestId('container')!;
        fireEvent.mouseDown(container);
        fireEvent.click(container);
        expect(onClose).toHaveBeenCalledTimes(0);
    });
});
