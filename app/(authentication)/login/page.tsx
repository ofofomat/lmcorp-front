'use client';
import React, {useState} from "react";
import "./page.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleInputValues = (event) => {
        event.preventDefault();
        if (!email || !password) {
            setError("Por favor, preencha todos os campos para efetuar o login em sua conta.");
            return;
        } else {
            setError("");
        }
    };

    return (
        <div className="login-container">
            <div className="left-panel">
                <h1 className="logo">LM <span className={"title-span"}>Corp</span></h1>
                <p className="description">
                    Organize seu ensino, simplifique sua gestão: Soluções digitais para salas de aula mais eficientes.
                </p>
            </div>
            <div className="right-panel">
                <h2>Acesse sua conta:</h2>
                <form className="login-form" onSubmit={handleInputValues}>
                    <input
                        type="email"
                        placeholder="Digite seu e-mail"
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="login-button">
                        Entrar ➜
                    </button>
                </form>
                <p className="signup-text">
                    Não possui uma conta? <a href="../register/">Crie aqui!</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
