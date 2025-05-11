document.addEventListener('DOMContentLoaded', () => {
    const loopEndValueInput = document.getElementById('loopEndValue');
    const bishValueInput = document.getElementById('bishValue');
    const boshValueInput = document.getElementById('boshValue');
    const startBishBoshButton = document.getElementById('startBishBosh');
    const resultListDiv = document.getElementById('result');

    startBishBoshButton.addEventListener('click', () => {
        const loopEndValue = parseInt(loopEndValueInput.value);
        const bishValue = parseInt(bishValueInput.value);
        const boshValue = parseInt(boshValueInput.value);

        if (isNaN(loopEndValue) || isNaN(bishValue) || isNaN(boshValue) || loopEndValue < 1 || bishValue < 1 || boshValue < 1) {
            return resultListDiv.textContent = 'Ogiltiga värden. Vänligen ange positiva heltal.';
        }

        const bishBosh = (n, bish, bosh) => {
            let result = [];
            for (let i = 1; i <= n; i++) {
                if (i % bish === 0 && i % bosh === 0) {
                    result.push("Bish-Bosh");
                } else if (i % bish === 0) {
                    result.push("Bish");
                } else if (i % bosh === 0) {
                    result.push("Bosh");
                } else {
                    result.push(i);
                }
            }
            return result;
        };
        resultListDiv.textContent = bishBosh(loopEndValue, bishValue, boshValue).join(', ');
    });
});