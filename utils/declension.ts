/**
 * Утиліта для вибору відповідної до числа
 * форми (відміни) іменника.
 * Допомагає правильно сформувати тексти,
 * наприклад "1 експерт", "5 експертів".
 */
export default function declension({
    number, // Чисельне значення
    f0,     // Форма 1: "Коментар"
    f1,     // Форма 2: "Коментаря"
    f2      // Форма 3: "Коментарів"
}: {
    number: number;
    f0: string;
    f1: string;
    f2: string;
}) {
    const abs = Math.abs(number);
    if (abs % 10 == 1 && abs % 100 != 11) {
        return f0;
    } else if (
        abs % 10 >= 2 &&
        abs % 10 <= 4 &&
        (abs % 100 < 10 || abs % 100 >= 20)
    ) {
        return f1;
    } else {
        return f2;
    }
}
