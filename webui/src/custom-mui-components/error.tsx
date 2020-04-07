/********************************************************************************
 * Copyright (c) 2020 TypeFox and others
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 ********************************************************************************/

import * as React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { Theme, WithStyles, createStyles, withStyles, Popover } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class ErrorDialog extends React.Component<ErrorDialog.Props, ErrorDialog.State> {
    constructor(props: Readonly<ErrorDialog.Props>) {
        super(props);
        this.state = {};
    }

    handleClose(this: any) {
        this.setState({ anchor: null })
    }

    render() {
        return <div>
            <Dialog
                open={open}
                onClose={() => this.setState({ anchor: null })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.props.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Ok
          </Button>
                </DialogActions>
            </Dialog>
        </div>;
    }
}

export namespace ErrorDialog {
    export interface Props {
        title: React.ReactNode,
        message: React.ReactNode
    }
    export interface State {
        anchor?: Element | null;
    }
}