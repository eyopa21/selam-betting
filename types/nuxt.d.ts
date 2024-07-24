// types/nuxt.d.ts

import { ComputedRef } from 'vue';
import { AuthSessionSchema } from './login';

declare module '#app' {
    interface NuxtApp {
        $authentication: {
            session: ComputedRef<AuthSessionSchema | null>;
            loggedIn: ComputedRef<boolean>;
            updateSession: (candidate: AuthSessionSchema | null) => void;
            accessToken: ComputedRef<string | null>;
            userId: ComputedRef<string | null>;
            logout: () => void;
        };
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $authentication: {
            session: ComputedRef<AuthSessionSchema | null>;
            loggedIn: ComputedRef<boolean>;
            updateSession: (candidate: AuthSessionSchema | null) => void;
            accessToken: ComputedRef<string | null>;
            userId: ComputedRef<string | null>;
            logout: () => void;
        };
    }
}
