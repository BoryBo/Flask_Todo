export default function sortArrByTimestamp (arr) {
    if (arr.length) {

        return arr.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
    return [];
}
