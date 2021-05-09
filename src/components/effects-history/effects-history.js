import './effects-history.css'

export const EffectsHistory = ({ history, onItemClick }) => {
    return (
        <div className={'effects-history'}>
            <h3>History</h3>
            <div className={'effects-history__items'}>
                {history.map(({ type, effectId }, i) => (
                    <button key={`${type}${effectId}${i}`} onClick={() => { onItemClick(i + 1) }}>
                        {effectId ? `${type}: ${effectId}` : type}
                    </button>
                ))}
            </div>
        </div>
    );
}