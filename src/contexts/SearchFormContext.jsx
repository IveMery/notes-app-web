import React, { createContext, useContext, useEffect, useState } from "react";

const SearchFormContext = createContext()

const SearchFormProvider = ({ children }) => {

    const [search, setSearch] = useState('')

    return (
        <SearchFormContext.Provider value={{ search, setSearch}}>
            {children}
        </SearchFormContext.Provider>
    )
}

const useTheme = () => {
    const context = useContext(SearchFormContext);
    return context;
};
export { SearchFormProvider, useTheme }