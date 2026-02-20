function distinctArray(a) {
    const a2 = [];
    for (const e of a) {
        if (!(a2.includes(e))) {
            a2.push(e);
        }
    }
    return a2;
}

export {
    distinctArray,
}