export const prettifyType = (type) => {
    switch (type) {
        case 'effectTriggered':
            return `🔥`;
        case 'effectResolved':
            return `🏁`;
        case 'actionDispatched':
            return `🎬`;
        default:
            return '';
    }
}