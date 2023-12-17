const calculateBtn = document.getElementById('calc-btn');
const resetBtn = document.getElementById('reset-btn');
const heightInput = document.getElementById('height-input');
const weightInput = document.getElementById('weight-input');

const resetInputs = () => {
  heightInput.value = '';
  weightInput.value = '';
};

const calculateBmi = () => {
  const enteredHeight = +heightInput.value;
  const enteredWeight = +weightInput.value;

  const bmi = enteredWeight / enteredHeight ** 2;

  console.log(bmi);
};

calculateBtn.addEventListener('click', calculateBmi);
resetBtn.addEventListener('click', resetInputs);
