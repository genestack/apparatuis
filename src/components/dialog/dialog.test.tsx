/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
// tslint:disable no-non-null-assertion
import * as React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';
import {Divider} from '../divider';
import {Overlay} from '../overlay';
import {Paper} from '../paper';

import {Dialog, Props as DialogProps} from './dialog';
import {DialogBody} from './dialog-body';
import {DialogFooter} from './dialog-footer';
import {DialogFullWidth} from './dialog-full-width';
import {DialogHeader} from './dialog-header';

const app = createTestApp();

describe('<Dialog />', () => {
    beforeEach(app.beforeEach);
    afterEach(app.afterEach);

    const setup = (props?: Partial<DialogProps>) =>
        app.mount(
            <Dialog
                id="dialog"
                open
                {...props}
                containerProps={{id: 'container'}}
                closeButtonProps={{id: 'close-button'}}
            >
                <DialogHeader id="dialog-header" />
                <DialogBody id="dialog-body">
                    <DialogFullWidth id="full-width" />
                </DialogBody>
                <DialogFooter id="dialog-footer" />
            </Dialog>
        );

    it('should focus self when opened', () => {
        setup();
        expect(document.activeElement).toBe(document.getElementById('dialog'));
    });

    it('should not focus self when closed', () => {
        setup({open: false});
        expect(document.activeElement).toBe(document.body);
    });

    it('should render <Overlay />', () => {
        expect(setup().find(Overlay)).toHaveLength(1);
    });

    it('should render <Paper />', () => {
        expect(setup().find(Paper)).toHaveLength(1);
    });

    it('should render header', () => {
        setup();
        expect(document.getElementById('dialog-header')).toBeTruthy();
    });

    it('should render body', () => {
        setup();
        expect(document.getElementById('dialog-body')).toBeTruthy();
    });

    it('should render footer', () => {
        setup();
        expect(document.getElementById('dialog-footer')).toBeTruthy();
    });

    it('should render full width component', () => {
        setup();
        expect(document.getElementById('full-width')).toBeTruthy();
    });

    it('should render container', () => {
        setup();
        expect(document.getElementById('container')).toBeTruthy();
    });

    it('should close dialog by container click', () => {
        const onClose = jest.fn();
        setup({onClose});
        const container = document.getElementById('container')!;
        container.dispatchEvent(new MouseEvent('mousedown', {bubbles: true}));
        container.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should not close dialog if click starts not in a container', () => {
        const onClose = jest.fn();
        setup({onClose});
        const container = document.getElementById('container')!;
        const dialogBody = document.getElementById('dialog-body')!;
        dialogBody.dispatchEvent(new MouseEvent('mousedown', {bubbles: true}));
        container.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        expect(onClose).not.toBeCalled();
    });

    it('should render close button', () => {
        setup();
        expect(document.getElementById('close-button')).toBeTruthy();
    });

    it('should not render close button if hideCloseButton passed', () => {
        setup({hideCloseButton: true});
        expect(document.getElementById('close-button')).toBeFalsy();
    });

    it('should close dialog by close button click', () => {
        const onClose = jest.fn();
        setup({onClose});

        document
            .getElementById('close-button')!
            .dispatchEvent(new MouseEvent('click', {bubbles: true}));

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should render footer divider', () => {
        expect(
            setup()
                .find('#dialog-footer')
                .find(Divider)
                .filterWhere((component) => component.prop('variant') === 'stroke')
        ).toHaveLength(0);
    });

    it('should not render footer divider in scrollable mode', () => {
        expect(
            setup({scrollable: true})
                .find('#dialog-footer')
                .find(Divider)
                .filterWhere((component) => component.prop('variant') === 'stroke')
        ).toHaveLength(1);
    });

    it('should render header divider', () => {
        expect(
            setup()
                .find('#dialog-header')
                .find(Divider)
                .filterWhere((component) => component.prop('variant') === 'stroke')
        ).toHaveLength(0);
    });

    it('should not render header divider in scrollable mode', () => {
        expect(
            setup({scrollable: true})
                .find('#dialog-header')
                .find(Divider)
                .filterWhere((component) => component.prop('variant') === 'stroke')
        ).toHaveLength(1);
    });

    it('should not close dialog on backdrop click when overlayProps.disableClickListener = true', () => {
        const onClose = jest.fn();
        setup({onClose, overlayProps: {disableClickListener: true}});
        const container = document.getElementById('container')!;
        container.dispatchEvent(new MouseEvent('mousedown', {bubbles: true}));
        container.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        expect(onClose).toHaveBeenCalledTimes(0);
    });
});
