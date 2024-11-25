"use client";

import React from "react";

export default function Error({ error, reset }) {
    return (
        <div>
            <h1>Ocorreu um erro</h1>
            <p>{error.message}</p>
            <button onClick={() => reset()}>Tentar novamente</button>
        </div>
    );
}