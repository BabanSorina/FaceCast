function makeHitSlop(size) {
    return {
        top: size,
        right: size,
        bottom: size,
        left: size,
    };
}

export const metrics = {
    tabIconSize: 26,
    makeHitSlop,
};