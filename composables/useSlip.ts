export const useSlips = () => {
    interface Slip {
        id: number;
        name: string;
    }

    const slips = ref<Slip[]>([{ id: 1, name: "Slip 1" }]);
    const activeSlip = ref<Slip | null | undefined>(null);
    let slipCounter = ref(2);

    const addSlip = () => {
        const newSlip: Slip = {
            id: slipCounter.value,
            name: `Slip ${slipCounter.value}`,
        };

        slips.value.push(newSlip);
        slipCounter.value += 1;
        activeSlip.value = slips.value.find((s) => s.name == newSlip.name)
    };

    const removeSlip = (id: number) => {
        slips.value = slips.value.filter((slip) => slip.id !== id);
    };

    return {
        slips,
        activeSlip,
        addSlip,
        removeSlip,
    };
};
