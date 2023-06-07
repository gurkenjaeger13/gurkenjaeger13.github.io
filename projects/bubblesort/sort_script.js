let inputElm = document.getElementById("input");
let outputElm = document.getElementById("output");
let sampleBest = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];
let sampleWorts = [50,49,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
let running = false;


function pasteRand(){
    // uses the Fisher–Yates shuffle
    sampleRand = [...sampleBest];
    let m = sampleRand.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = sampleRand[m];
      sampleRand[m] = sampleRand[i];
      sampleRand[i] = t;
    }
    inputElm.value = sampleRand;
}

function pasteBest(){
    inputElm.value = sampleBest;
}
function pasteWorst(){
    inputElm.value = sampleWorts;
}


const copyContent = async () => {
    let text = outputElm.value;
    await navigator.clipboard.writeText(text);
}


function sort(){
    let checkbox = document.getElementById("visualize");

    if (checkbox.checked){
        sortVisual();
    }
    else{
        sortNonvisual();
    }
}

function sortNonvisual(){
    let rawNums = inputElm.value; // get the input from the box
    // convert the inputed numbers to an array (remove space, split at commas)
    let convNums = rawNums.replace(/\s/g, '').split(",").map(Number);

    //bubble-sort
    for (let i=0; i < convNums.length; i++){
        for (let j=0; j < (convNums.length-1-i); j++) {
            if (convNums[j] > convNums[j+1]) {// if the first number is bigger than the second, swap them
                let x = convNums[j]
                convNums[j] = convNums[j+1]
                convNums[j+1] = x
            }
        }
    }
    outputElm.value = convNums
}

function sortVisual(){
    if (!running){
        running = true;
        let rawNums = inputElm.value; // get the input from the box
        // convert the inputed numbers to an array (remove space, split at commas)
        let convNums = rawNums.replace(/\s/g, '').split(",").map(Number);
        // for bar-color: generates a color gradient!
        let numsColor =  [...convNums];
        let bordColor = [...convNums];
        let maxNum = Math.max(...convNums);
        // calculates delay depending on number of numbers
        let delay = 5000/((convNums.length)**2/4);

        const timer = ms => new Promise(res => setTimeout(res, ms))

        // this "async" function has to be used so the delay works
        async function load () {
            myChart.data.labels = convNums;
            myChart.data.datasets[0].data = convNums;
            // CALCULATE NEW COLORS
            for (let k=0; k < convNums.length; k++){
                numsColor[k] = 'rgba(120,' + 255/maxNum*convNums[k] + ',255,0.66)';
                bordColor[k] = 'rgba(120,' + 255/maxNum*convNums[k] + ',255,1)';
            }
            myChart.data.datasets[0].backgroundColor = numsColor;
            myChart.data.datasets[0].borderColor = bordColor;
            // update chart
            myChart.update('none');
            // delay (so the sorting isn't too fast)
            await timer(delay);
            
            // bubble sort
            for (let i=0; i < convNums.length; i++){
                for (let j=0; j < (convNums.length-1-i); j++) {
                    if (convNums[j] > convNums[j+1]) {// if the first number is bigger than the second, swap them
                        let x = convNums[j]
                        convNums[j] = convNums[j+1]
                        convNums[j+1] = x
                        myChart.data.labels = convNums;
                        myChart.data.datasets[0].data = convNums;
                        // CALCULATE NEW COLORS
                        for (let k=0; k < convNums.length; k++){
                            numsColor[k] = 'rgba(120,' + 255/maxNum*convNums[k] + ',255,0.66)';
                            bordColor[k] = 'rgba(120,' + 255/maxNum*convNums[k] + ',255,1)';
                        }
                        myChart.data.datasets[0].backgroundColor = numsColor;
                        myChart.data.datasets[0].borderColor = bordColor;
                        // update chart
                        myChart.update('none');
                        await timer(delay);
                    }
                }
            }
            outputElm.value = convNums;
            running = false
        }
        load();
    }
}


// FOR VISUALIZATION:

const ctx = document.getElementById('myChart');

let myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [0],
    datasets: [{
      label: false,
      data: [0],
      borderWidth: 1,
      backgroundColor: 'blue',
      borderColor: 'red'
    }]
  },
  options: {
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            enabled: false
        }
    },
    scales: {
      y: {
        display: false
      },
      x: {
        display: false
      },
    },
    responsive: true,
    maintainAspectRatio: false
  }
});