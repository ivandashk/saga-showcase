import './effects-history.css'

export const EffectsHistory = ({ history }) => {
    return (
        <div className={'effects-history'}>
            <h3>History</h3>
            <ul>
                {history.map(({ type, effectId }, i) => (
                    <li key={`${type}${effectId}${i}`}>
                        {effectId ? `${type}: ${effectId}` : type}
                    </li>
                ))}
            </ul>
        </div>
    );
}