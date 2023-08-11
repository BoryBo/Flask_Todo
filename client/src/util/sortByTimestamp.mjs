export default function sortArrByTimestamp (arr) {
    if (arr.length > 1) {
        return arr.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
    return arr;
}
