/********************************************************************************
 * Copyright (c) 2020 TypeFox and others
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 ********************************************************************************/
package org.eclipse.openvsx.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class NamespaceMembership {

    public static final String ROLE_OWNER = "owner";
    public static final String ROLE_CONTRIBUTOR = "contributor";

    @Id
    @GeneratedValue
    long id;

    @ManyToOne
    @JoinColumn(name = "namespace")
    private Namespace namespace;

    @ManyToOne
    @JoinColumn(name = "user_data")
    private UserData user;

    @Column(length = 32)
    private String role;


    public long getId() {
        return id;
    }

    public void setId(long id) {
		this.id = id;
    }
    
    public UserData getUser() {
        return user;
    }

    public void setUser(UserData user) {
        this.user = user;
    }

    public Namespace getNamespace() {
        return namespace;
    }

    public void setNamespace(Namespace namespace) {
        this.namespace = namespace;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

}