import { $fetch, type FetchOptions } from 'ofetch';

import SportsModule from '~/repository/modules/sports';
import TournametsModule from '~/repository/modules/tournaments';

interface IApiInstance {
    sports: SportsModule;
    tournaments: TournametsModule;
}

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    const fetchOptions: FetchOptions = {
        baseURL: `${config.public.apiBaseUrl}/betting/api/v1`
    };

    // Create a new instance of $fecther with custom option
    const apiFecther = $fetch.create(fetchOptions);


    // An object containing all repositories we need to expose
    const modules: IApiInstance = {
        sports: new SportsModule(apiFecther),
        tournaments: new TournametsModule(apiFecther),
    };

    return {
        provide: {
            api: modules
        }
    };
});