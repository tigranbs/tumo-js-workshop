$(function () {
    let rates = {};
    $.get('https://api.exchangeratesapi.io/latest', function (data) {
        rates = data.rates;
        for (let currencyName in rates) {
            $('#currencySelect').append('<option value="'
                + currencyName + '">' + currencyName +
                '</option>');
        }
    });
    $('#currencyForm').submit(function () {
        const currency = $(this).find('select[name=currency]').val();
        const amount = $(this).find('input[name=amount]').val();
        if (currency in rates) {
            const euroAmount = amount / rates[currency];
            $('#rateAmount').text(euroAmount);
        } else {
            $('#rateAmount').text('Input currencies from list '
                + Object.keys(rates).join(', '));
        }
        return false;
    });
});
