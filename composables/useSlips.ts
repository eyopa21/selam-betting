
import type { MatchDetail, Odds, Slips } from '~/types/slips'
import { useQuasar } from 'quasar'

export function useSlips() {
    const $q = useQuasar()

    const slipCount = useState('slipCount', () => 1)
    const activeSlip = useState('activeSlip', () => 'slip1')

    const slips = useState<Slips[]>('slips', () => [{
        id: 1,
        name: 'slip1',
        label: 'Slip 1',
        games: [],
        birr: 0
    }
    ])


    const addSlip = () => {
        slipCount.value++;

        const newSlip: Slips = {
            id: slipCount.value,
            name: `slip${slipCount.value}`,
            label: `Slip ${slipCount.value}`,
            games: [],
            birr: 0
        }
        activeSlip.value = newSlip.name
        slips.value.push(newSlip)
    }
    const findSlipById = ref<Slips>(slips.value[0])

    watch(activeSlip, () => {
        findSlipById.value = slips.value.find(slip => slip.name === activeSlip.value) ?? slips.value[0]
    })

    // const findSlipById = computed(() => {
    //     return slips.value.find(slip => slip.name === activeSlip.value);
    // })

    const addGameToSlip = (game: Odds) => {
        let alreadySelected = findSlipById.value?.games.find(formerGame => formerGame.matchDetail.id === game.matchDetail.id);

        if (alreadySelected !== undefined) {

            // $q.notify({
            //     message: 'Odd Value Updated',
            //     icon: 'announcement',
            //     position: 'top'
            // })
            findSlipById.value.games = findSlipById.value.games?.map(obj =>
                obj.matchDetail.id === game.matchDetail.id ? { ...obj, ...game } : obj
            );
        }
        else {
            findSlipById.value?.games.push(game)
        }
    }
    const removeSlip = (slipId: number) => {
        slips.value = slips.value.filter((slip) => slip.id !== slipId);
        activeSlip.value = `slip${slipId - 1}`
    };

    const calculateTotalOdd = (games: Odds[]) => {

        if (!games?.length) {
            return 0;
        }
        else {
            let totalOdd = 1;
            for (let i = 0; i < (games?.length); i++) {

                totalOdd = (totalOdd * games[i]?.odd)
            }


            return totalOdd
        }
    }

    function removeBet(outcomeId: number) {
        findSlipById.value.games = findSlipById.value.games?.filter(game => game.outcomeId !== outcomeId)
    }

    return {
        slips,
        slipCount,
        activeSlip,
        addSlip,
        findSlipById,
        addGameToSlip,
        calculateTotalOdd,
        removeSlip,
        removeBet
    }
}