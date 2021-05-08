import { Block } from '../block/block';

import './action-history.css'

export const ActionHistory = ({ actionHistory }) => {
    if (!actionHistory.length) {
        return null;
    }

    return (
        <>
            <h3>Action History</h3>
            <div className={'action-history'}>
                {actionHistory.map(({ type }, i) => (
                <Block
                    key={`${type}_${i}`}
                    mod={type}
                    name={type}
                />
                ))}
            </div>
        </>

    )
}