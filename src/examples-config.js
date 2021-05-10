import { rootSaga as example1RootSaga } from './sagas/example-1';
import { code as example1Code } from './sagas/example-1';

import { rootSaga as example2RootSaga } from './sagas/example-2';
import { code as example2Code } from './sagas/example-2';

import { rootSaga as example3RootSaga } from './sagas/example-3';
import { code as example3Code } from './sagas/example-3';

import { rootSaga as example4RootSaga } from './sagas/example-4';
import { code as example4Code } from './sagas/example-4';

export const examplesConfig = [
    {
        slug: 'example-1',
        name: 'Basic example',
        code: example1Code,
        rootSaga: example1RootSaga,
    },
    {
        slug: 'example-2',
        name: 'Functions',
        code: example2Code,
        rootSaga: example2RootSaga,
    },
    {
        slug: 'example-3',
        name: 'Chaining sagas',
        code: example3Code,
        rootSaga: example3RootSaga,
    },
    {
        slug: 'example-4',
        name: 'Fork vs Spawn',
        code: example4Code,
        rootSaga: example4RootSaga,
    }
]