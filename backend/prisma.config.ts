import {config} from "dotenv";

const nodeEnv = process.env.NODE_ENV ?? "dev";
const envFile = `.env.${nodeEnv}`;
config({path: envFile, override: true});

import {defineConfig} from "prisma/config";

defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {path: "prisma/migrations"},
    datasource: {
        url: process.env.DATABASE_URL!,
    },
});