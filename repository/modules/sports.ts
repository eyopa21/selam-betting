import type { FetchOptions } from 'ofetch';
import type { AsyncDataOptions } from '#app';

import type { Sports } from '../../types/sports'
import FetchFactory from '../factory';

class SportsModule extends FetchFactory<Sports> {
    private RESOURCE = '/sports'
    /**
   * Return the sports as array 
   * @param asyncDataOptions options for `useAsyncData`
   * @returns 
   */

    async getSports(asyncDataOptions?: AsyncDataOptions<Sports>) {
        /*
         * wrapped with useAsyncData to prevent network call duplications
         */
        return useAsyncData(() => {
            const fetchOptions: FetchOptions<'json'> = {
                headers: {
                    'Connection': 'keep alive',
                }
            }
            return this.call(
                'GET',
                `${this.RESOURCE}`,
                undefined,
                fetchOptions
            )
        }, asyncDataOptions)
    }
}

export default SportsModule;
