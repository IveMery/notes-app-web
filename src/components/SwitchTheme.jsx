import React from 'react';
import { useTheme } from "../contexts/ThemeContext";

const SwitchTheme = () => {
    const { isDarkMode, toggleDarkMode, } = useTheme();

    return (
        <div className="form-check form-switch">
            <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckChecked"
                onChange={() => toggleDarkMode()}
                checked={isDarkMode} />
            <label
                className="form-check-label"
                htmlFor="flexSwitchCheckChecked">
                {isDarkMode ? "Tema Oscuro" : "Tema Claro"}
            </label>
        </div>
    );
}

export default SwitchTheme;
