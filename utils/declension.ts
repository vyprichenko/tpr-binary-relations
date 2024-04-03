export default function declension({
    number,
    f0, // Форма 1: "Комментарий"
    f1, // Форма 2: "Комментария"
    f2 // Форма 3: "Комментариев"
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
