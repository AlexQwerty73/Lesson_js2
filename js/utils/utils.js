export function getHash() {
    const hash = window.location.hash.replace('#', '');
    return hash;
}