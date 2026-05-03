import { useState, useEffect } from "react";

export function WelcomeText({ name }) {
    const [displayText, setDisplayText] = useState("");
    const fullText = `Bienvenido/a, ${name || "Usuario"}`;
  
    useEffect(() => {
        let i = 0;
        setDisplayText("");
    
        const typingInterval = setInterval(() => {
            if (i < fullText.length) {
                setDisplayText(fullText.substring(0, i + 1));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100); // Velocidad de escritura 

        return () => clearInterval(typingInterval);
    }, [name]); // Se reinicia si el nombre cambia

    return (
        <h1 className="home-title">
            {displayText}
            <span className="cursor">|</span>
        </h1>
    );
}