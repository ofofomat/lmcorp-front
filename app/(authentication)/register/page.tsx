'use client';
import React, {useState} from "react";
import "./page.css";

const RegisterPage = () => {

    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleInputValues = (event) => {
        event.preventDefault();
        if (!email || !confirmEmail || !password || !confirmPassword) {
            setError("Por favor, preencha todos os campos para efetuar o cadastro.");
            return;
        } else if (password !== confirmPassword || email !== confirmEmail) {
            setError("Informações de senha e/ou e-mail não coincidem. Por favor, preencha todos os dados corretamente.");
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
                <h2>Cadastre sua conta!</h2>
                <form className="login-form" onSubmit={handleInputValues}>
                    <input
                        type="email"
                        placeholder="Digite seu e-mail"
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Repita seu e-mail"
                        className="input-field"
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Crie uma senha"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Insira a senha novamente"
                        className="input-field last-input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="login-button"> Confirmar ➜</button>
                </form>
                <p className="signup-text">
                    Já possui uma conta? <a href="../login">Acesse aqui!</a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;