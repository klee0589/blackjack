const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: { path: path.resolve(__dirname, "dist") },
    mode: 'development',
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        extensionAlias: {
            ".js": [".js", ".ts"],
            ".cjs": [".cjs", ".cts"],
            ".mjs": [".mjs", ".mts"]
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    }
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            { test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" }
        ],
    },
};