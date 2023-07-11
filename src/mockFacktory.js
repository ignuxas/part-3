import { shallowMount } from '@vue/test-utils'

export function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item))
}

export function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                else if (target[key] === source[key]) continue; // Skip when target and source are the same object
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}


// export function mergeDeep(target, ...sources) {
//     if (!sources.length) return target
//     const source = sources.shift()

//     if (isObject(target) && isObject(source)) {
//         for (const key in source) {
//             if (isObject(source[key])) {
//                 if (!target[key]) Object.assign(target, { [key]: {} })
//                 mergeDeep(target[key], source[key])
//             } else {
//                 Object.assign(target, { [key]: source[key] })
//             }
//         }
//     }

//     return mergeDeep(target, ...sources)
// }


function createWrapper(page, overrides) {
    const defaultMountingOptions = {
        mocks: {
            $axios: {
                get: () => {
                    return new Promise(resolve => resolve({}))
                },
                put: () => Promise.resolve({}),
                post: () => Promise.resolve({}),
            }
        },
        stubs: {},
        propsData: {}

    }
    return shallowMount(
        page,
        mergeDeep(
            defaultMountingOptions,
            overrides
        )
    )
}

export default createWrapper



// createWrapper(MyComponent, {mocks: {
//     //your mocks goes here
// }})


