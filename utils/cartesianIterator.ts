/**
 * Генерує декартовий добуток (всі можливі комбінації)
 * елементів з кількох масивів.
 *
 * @param items - масиви елементів для комбінування.
 */
export default function* cartesianIterator<T>(items: T[][]): Generator<T[]> {
    const remainder =
        items.length > 1 ? cartesianIterator(items.slice(1)) : [[]];
    for (let r of remainder) for (let h of items.at(0)!) yield [h, ...r];
}
