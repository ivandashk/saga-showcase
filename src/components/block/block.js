import './block.css'

const chooseMod = (mod) => {
    switch (mod) {
        case 'FORK':
            return 'fork';
        case 'TAKE':
            return 'take';
        default:
            return '';
    }
}

export const Block = ({ id, name, parentEffectId, mod }) => {
    const modificator = chooseMod(mod);

    return (
        <div className={`block ${modificator ? `block_${modificator}` : ''}`}>
            <span className={'block__parent-id'}>{parentEffectId}</span>
            {id ? `${id}: ${name}` : name}
        </div>
    )
}