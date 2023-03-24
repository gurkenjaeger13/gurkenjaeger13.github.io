let inputElm = document.getElementById("input");
let outputElm = document.getElementById("output");

function sort(){
    let rawNums = inputElm.value; //get the input from the box
    //convert the inputed numbers to an array (remove space, split at commas)
    let convNums = rawNums.replace(/\s/g, '').split(",").map(Number);

    //bubble-sort
    for (let i=0; i < convNums.length; i++){
        for (let j=0; j < (convNums.length-1-i); j++) {
            if (convNums[j] > convNums[j+1]) {//if the first number is bigger than the second, swap them
                let x = convNums[j]
                convNums[j] = convNums[j+1]
                convNums[j+1] = x
            }
        }
    }
    outputElm.value = convNums
    console.log(convNums)
}

function sortVisual(){
    let rawNums = inputElm.value; //get the input from the box
    //convert the inputed numbers to an array (remove space, split at commas)
    let convNums = rawNums.replace(/\s/g, '').split(",").map(Number);
    //for bar-color
    let numsColor =  [...convNums];
    let bordColor = [...convNums];
    let maxNum = Math.max(...convNums);
    let delay = 5000/((convNums.length)**2/4);
    console.log(delay);

    const timer = ms => new Promise(res => setTimeout(res, ms))

    async function load () { // We need to wrap the loop into an async function for this to work
        //bubble-sort
        for (let i=0; i < convNums.length; i++){
            for (let j=0; j < (convNums.length-1-i); j++) {
                if (convNums[j] > convNums[j+1]) {//if the first number is bigger than the second, swap them
                    let x = convNums[j]
                    convNums[j] = convNums[j+1]
                    convNums[j+1] = x
                    console.log("SORTING...")
                    myChart.data.labels = convNums;
                    myChart.data.datasets[0].data = convNums;
                    //CALCULATE NEW COLORS
                    for (let k=0; k < convNums.length; k++){
                        numsColor[k] = 'rgba(120,' + 255/maxNum*convNums[k] + ',255,0.66)';
                        bordColor[k] = 'rgba(120,' + 255/maxNum*convNums[k] + ',255,1)';
                    }
                    myChart.data.datasets[0].backgroundColor = numsColor;
                    myChart.data.datasets[0].borderColor = bordColor;
                    //update chart
                    myChart.update('none');
                    await timer(delay);
                }
            }
        }
        outputElm.value = convNums;
        console.log(convNums);
        console.log(numsColor);
        console.log(typeof(numsColor));
    }

    load();



}




//FOR VISUALISATION

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
    }
  }
});


/* 1-100
74,79,10,87,52,80,35,71,17,28,77,64,97,25,76,23,93,48,16,38,46,70,41,82,49,43,21,30,29,88,65,62,2,7,3,59,37,85,56,47,95,78,73,1,69,36,68,6,86,12,32,66,11,4,19,50,14,67,45,58,90,100,20,61,40,98,44,92,5,24,54,72,51,55,15,81,60,91,33,83,31,57,9,42,94,26,63,18,34,8,39,27,84,89,96,22,75,13,53,99

random 100
48, 23, 68, 55, 53, 66, 2, 49, 84, 18, 28, 47, 89, 65, 54, 84, 68, 44, 31, 49, 37, 8, 11, 75, 90, 46, 88, 93, 18, 1, 56, 74, 20, 28, 16, 89, 54, 88, 23, 52, 49, 51, 79, 90, 53, 91, 72, 45, 10, 48, 9, 61, 11, 8, 68, 38, 39, 70, 79, 41, 3, 54, 52, 16, 82, 43, 0, 49, 84, 96, 60, 10, 22, 43, 28, 61, 76, 93, 4, 67, 41, 75, 57, 13, 44, 43, 89, 80, 64, 15, 25, 98, 67, 31, 55, 55, 8, 22, 23, 69

random 1-10

5,3,4,1,7,2,8,10,6,9

*/
