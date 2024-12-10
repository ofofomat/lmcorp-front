'use client';

import React from "react";
import { ReactNode } from "react";

const AuthenticationLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="app-container">
            <div className="main-content">
                <div className="page-content">{children}</div>
            </div>
        </div>
    );
};

export default AuthenticationLayout;