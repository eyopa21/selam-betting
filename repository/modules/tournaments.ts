import type { FetchOptions } from 'ofetch';
import type { AsyncDataOptions } from '#app';

import type { Tournaments } from '../../types/tournaments'
import FetchFactory from '../factory';

class TournametsModule extends FetchFactory<Tournaments> {
    private RESOURCE = '/tournament'
    /**
   * Return the sports as array 
   * @param asyncDataOptions options for `useAsyncData`
   * @returns 
   */

    async getTournamentsUnderSport(id: number, asyncDataOptions?: AsyncDataOptions<Tournaments>) {
        /*
         * wrapped with useAsyncData to prevent network call duplications
         */
        return useAsyncData(() => {
            const fetchOptions: FetchOptions<'json'> = {
                headers: {
                    'X-API-KEY': 'RUDKb1iueBuAtFhYGKQxyXhSc2rVKYxe5TNIuTxtEDv6o2jcefPb6p7jXeZlu_LgHExd-_USDVruUS2LjHrSnTOXQnrhIrw9vHLlg7eJDNg'
                }
            }
            return this.call(
                'GET',
                `${this.RESOURCE}/${id}`,
                undefined,
                fetchOptions
            )
        }, asyncDataOptions)
    }
}

export default TournametsModule;
