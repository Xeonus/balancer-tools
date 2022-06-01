export function calculateGaugeAPR (poolId, gaugeArray, boost, gauge_relative_weight, gauge_working_supply, bal_price) {

    let gauge_bpt_price = 0;
    gaugeArray.forEach( el => {
        if (el.poolId === poolId) {
            gauge_bpt_price = Number(el.pricePerBPT);
        }
    });
    
    const balEmission = 145000;
    const shareOneBPT = 0.4 / (Number(gauge_working_supply) + 0.4);
    const weeklyReward = shareOneBPT * Number(gauge_relative_weight) * balEmission;
    const yearlyReward = weeklyReward * boost * 52 * bal_price;
    const apr = yearlyReward / gauge_bpt_price * 100;

    console.log("gauge_bpt_price", gauge_bpt_price);
    console.log("gauge_working_supply", Number(gauge_working_supply));
    console.log("shareOneBPT", shareOneBPT);
    console.log("weeklyReward", weeklyReward);
    console.log("standardAPR", gauge_relative_weight * balEmission * bal_price * 52 * 100 / (Number(gauge_working_supply) * gauge_bpt_price))
    console.log("minAPR", apr);
    return apr;
}