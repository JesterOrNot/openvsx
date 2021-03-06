/********************************************************************************
 * Copyright (c) 2019 TypeFox and others
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 ********************************************************************************/

import * as React from 'react';
import PopperJS from 'popper.js';
import { withStyles, createStyles } from '@material-ui/styles';
import { Theme, WithStyles, Avatar, Popper, Paper, ClickAwayListener, Typography, Box, Grow } from '@material-ui/core';
import { Link as RouteLink } from 'react-router-dom';
import { handleError } from '../../utils';
import { UserData, isError } from '../../extension-registry-types';
import { ExtensionRegistryService } from '../../extension-registry-service';
import { UserSettingsRoutes } from './user-settings';

const avatarStyle = (theme: Theme) => createStyles({
    avatar: {
        cursor: 'pointer',
        width: '30px',
        height: '30px'
    },
    link: {
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.text.primary
    }
});

class ExtensionRegistryAvatarComponent extends React.Component<ExtensionRegistryAvatarComponent.Props, ExtensionRegistryAvatarComponent.State> {

    protected avatarButton: HTMLElement | null;
    protected popperRef: PopperJS | null;

    constructor(props: ExtensionRegistryAvatarComponent.Props) {
        super(props);

        this.state = {
            open: false
        };
    }

    componentDidMount() {
        this.updateCsrf();
    }

    protected async updateCsrf() {
        try {
            const csrfToken = await this.props.service.getCsrfToken();
            if (!isError(csrfToken)) {
                this.setState({ csrf: csrfToken.value });
            }
        } catch (err) {
            handleError(err);
        }
    }

    componentDidUpdate() {
        if (this.popperRef) {
            this.popperRef.update();
            this.popperRef.update();
        }
    }

    protected readonly handleAvatarClick = () => {
        this.setState({ open: !this.state.open });
    }
    protected readonly handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        return <React.Fragment>
            <Avatar
                onClick={this.handleAvatarClick}
                src={this.props.user.avatarUrl}
                variant='rounded'
                classes={{ root: this.props.classes.avatar }}
                ref={ref => this.avatarButton = ref} />
            <Popper open={this.state.open} anchorEl={this.avatarButton} popperRef={ref => this.popperRef = ref} placement='bottom-end' disablePortal transition>
                {({ TransitionProps, placement }) => (
                    <Grow {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={this.handleClose}>
                                <Box p={1}>
                                    <Typography variant='overline' color='textPrimary'>Logged in as {this.props.user.loginName}</Typography>
                                    <Box mt={1}>
                                        <Box style={{ paddingBottom: '15px'}}>
                                            <RouteLink onClick={this.handleClose} to={UserSettingsRoutes.PROFILE} className={this.props.classes.link}>
                                                <Typography variant='button' color='textPrimary'>
                                                    Settings
                                                </Typography>
                                            </RouteLink>
                                        </Box>
                                        <Box>
                                            <form method="post" action={this.props.service.getLogoutUrl()}>
                                                {
                                                    this.state.csrf ?
                                                    <input name="_csrf" type="hidden" value={this.state.csrf}/>
                                                    : ''
                                                }
                                                <button type="submit" className={this.props.classes.link}>
                                                    <Typography variant='button'>
                                                        Log Out
                                                    </Typography>
                                                </button>
                                            </form>
                                        </Box>
                                    </Box>
                                </Box>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>;
    }
}

export namespace ExtensionRegistryAvatarComponent {
    export interface Props extends WithStyles<typeof avatarStyle> {
        user: UserData;
        service: ExtensionRegistryService;
    }

    export interface State {
        open: boolean;
        csrf?: string;
    }
}

export const ExtensionRegistryAvatar = withStyles(avatarStyle)(ExtensionRegistryAvatarComponent);
