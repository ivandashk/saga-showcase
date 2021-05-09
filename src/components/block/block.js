import './block.css'

const chooseModData = (mod, payload) => {
    switch (mod) {
        case 'FORK':
            return {
                modificator: 'fork',
                additionalText: String(payload.fn)
            }
        case 'CALL':
            return {
                modificator: 'call',
                additionalText: String(payload.fn)
            }
        case 'TAKE':
            return {
                modificator: 'take'
            };
        default:
            return {
                modificator: ''
            };
    }
}

export const Block = ({ id, name, mod, payload, disabled, fullInfo }) => {
    const { modificator, additionalText} = chooseModData(mod, payload);

    return (
        <div className={`block ${modificator ? `block_${modificator}` : ''} ${disabled ? `block_disabled` : ''}`} title={fullInfo}>
            <div className={'block__main-text'}>{id ? `${id}: ${name}` : name}</div>
            <div className={'block__add-text'}>{additionalText}</div>
        </div>
    )
}