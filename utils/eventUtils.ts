export function convertToDateString(dateStr: string): string {
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);
    return date.toISOString().slice(0, 10);
}

export function extractOdds(data: any[], teams: string) {
    const odds: { outcomeId: number, eventId: number, value: string; odd: string }[] = [];

    const [team1, team2] = teams.split(" vs ").map((team) => team.trim());
    const betMap: { [key: string]: { [key: string]: string } } = {
        "Home Draw Away, Ordinary Time": {
            [team1]: "1",
            Draw: "X",
            [team2]: "2",
        },
        "Double Chance, Ordinary Time": {
            [`${team1} Or Draw`]: "1x",
            [`${team1} Or ${team2}`]: "12",
            [`${team2} Or Draw`]: "x2",
        },
    };

    data?.forEach((item) => {
        const bettingType = item.name;
        item.outcomes.forEach((outcome: any) => {

            const outcomeName = outcome.name;
            const oddValue = outcome.betting_offers[0]?.odds;
            if (oddValue) {
                if (bettingType in betMap && outcomeName in betMap[bettingType]) {
                    odds.push({
                        outcomeId: outcome.id,
                        eventId: item.eventId,
                        value: betMap[bettingType][outcomeName],
                        odd: oddValue.toFixed(2),
                    });
                }
            }
        });
    });

    const sortOrder = ["1", "X", "2", "1x", "12", "x2"];
    odds.sort((a, b) => sortOrder.indexOf(a.value) - sortOrder.indexOf(b.value));

    return odds;
}