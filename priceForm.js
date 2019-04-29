const priceForm =  $(".calculate-price__form");
const amountInput = priceForm.find(".quantity .counter"),
      increaseAmount = priceForm.find(".quantity .plus"),
      decreaseAmount = priceForm.find(".quantity .minus"),
      totalCost = priceForm.find(".price .value .numb");

let amountCount = +amountInput.val();

amountInput.on("change", function () {
    setAmount(+$(this).val());
});

increaseAmount.on("click", function (event) {
    event.preventDefault();

    setAmount(amountCount + 1);
});

decreaseAmount.on("click", function (event) {
    event.preventDefault();

    setAmount(amountCount - 1);
});

const setAmount = amount => {
    if (amount > 0 && amount < 90) {
        amountCount = amount;
    }

    amountInput.val(amountCount);
    setPrice(amountCount);
};

const setPrice = price => {
    const cost = price * 11 - 1;

    totalCost.html(cost.toString());
};