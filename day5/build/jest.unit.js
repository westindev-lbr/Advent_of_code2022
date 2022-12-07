const jestConfig = {
    preset: 'ts-jest/presets/default-esm',
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    transform: {
        // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
        // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                useESM: true,
            },
        ],
    },
    collectCoverage: true,
    coverageDirectory: "./coverage",
    testMatch: [
        "**/?(*.)+(spec|test).ts"
    ],
    resetMocks: true,
    clearMocks: true,
    verbose: true
};
export default jestConfig;
