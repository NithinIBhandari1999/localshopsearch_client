export const inputNullToString = (input) => {
    try {
        if (!input) {
            return "";
        }
        if (input === null || input === undefined) {
            return "";
        }
        return input;
    } catch (error) {
        return "";
    }
}