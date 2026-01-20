import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import environment from "../config/environments/env.json";

export const authClient = createAuthClient({
    baseURL: environment.API_URL || "http://localhost:8000", // Base URL of your Better Auth backend.
    plugins: [
        expoClient({
            scheme: "lcgapp",
            storagePrefix: "lcgapp",
            storage: SecureStore,
        })
    ]
});