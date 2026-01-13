import UnitTest from "./unit_core.js"

export function unit_node() {

    let ut = new UnitTest({
        lifecycle: {
            beforeAll: () => {

            },
            beforeEach: (data) => {

            },
            beforeItem: (data) => {

            },
            afterItem: (data) => {

            },
            afterEach: (data) => {

            }
        }
    })

    return {
        describe: ut.describe.bind(ut),
        it: ut.it.bind(ut),
        expect: ut.expect.bind(ut)
    }
}