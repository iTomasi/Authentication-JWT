export const vCode = (num: number) => {
    const WORDS = "aABbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
    const NUMBERS = "0123456789";
    let arrayCode: string[] = [];

    for (let i = 0; i < num; i++) {
        const random_WORD = Math.floor(Math.random() * WORDS.length);
        const random_NUMBER = Math.floor(Math.random() * NUMBERS.length)

        arrayCode = [...arrayCode, WORDS[random_WORD], NUMBERS[random_NUMBER]]
        arrayCode.sort(() => Math.random() - 0.5);
    }

    const gettingCode = arrayCode.join("");

    return gettingCode
}