export const useBrowserStorage = () => {
    const getFromLocalStorage = <T>(key: string) => {
        const value = localStorage.getItem(key);

        if (!value) {
            console.log(`A local storage value for ${key} could not be found.`);
            return null;
        }

        let parsedValue: T | null = null;

        try {
            parsedValue = JSON.parse(value);
        } catch (error) {
            console.warn(`The json value ${value} for the key ${key} could not be parsed.`, error);
        }

        return parsedValue;
    };

    const saveToLocalStorage = <T>(key: string, value: T) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.warn(`The value ${value} for ${key} could not be stringified.`, error);
        }
    };

    return { getFromLocalStorage, saveToLocalStorage };
};
