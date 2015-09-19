//CANVAS


function PixelPainter(width, height) {
  var buttons = new Array(width);
  var swatch = new Array(16);
  var erase = document.createElement('button');
  var clear = document.createElement('clear');
  var selColor = 'white';

//save array of colors
  var defColors = ['white', 'silver', 'gray', 'black', 'red', 'maroon', 'yellow', 'olive', 'lime', 'green', 'aqua', 'teal', 'blue', 'navy', 'fuschsia', 'purple'];
//MAKE SWATCH BUTTONS
  erase.className = 'button';
  clear.className = 'button';
  erase.addEventListener('click', function() {
    selColor = 'white';
  })
  clear.addEventListener('click', function() {
    //create for loop to access all buttons
    for (var i = 0, i < width; i++) {
      for (var j = 0, j < height; j++) {
        buttons[i][j].style.background = 'white';
      }
    }

  })


  for (var i = 0; i < swatch.length; i++) {

    //create new buttons for swatch
    swatch[i] = document.createElement('button');
    //give background new colors based on i
    swatch[i].style.background = defColors[i];
    //add event listener
    swatch[i].addEventListener('click', function() {
      //sets current color to background
      selColor = this.style.background;
    })
  }

//GRID BUTTONS AND EVENT LISTENERS
//ties height to width creating second dimension
  for (var i = 0; i < width; i++) {
    buttons[i] = new Array(height);

//make a grid of buttons

//creates buttons

//add event listener to each button
// handler function takes selColor from swatch to change button selColor
    for (var j = 0; j < height; j++) {
      buttons[i][j] = document.createElement('button');
      buttons[i][j].className = 'button';
      buttons[i][j].addEventListener('click', function() {
//this refers to i, j position, set to selColor which can be changed
        this.style.background = selColor;
      })
    }
  }

//ADD BUTTONS TO DIV GRID
//make a div for each row to separate rows
  var grid = document.createElement('<div>');
  for (var i = 0; i < width; i++) {
//making a div within a div
    grid[i] = document.createElement('div');

    for (var j = 0; j < height; h++) {
      //append to each div made
      grid[i].appendChild(buttons[i][j]);
    }
  }

  //add grid to content's innerHTML
  document.getElementById('pixelPainter').appendChild(grid);

  //add swatch buttons to HTML grid
  //make outside div - border of swatch [  ]
  var topbar = document.createElement('div');
  //creates first column [ [...] ]
  var row1 = document.createElement('div');
  //creates second column [ [...] [...] ]
  var row2 = document.createElement('div');

  for (var i = 0; i < swatch.length; i++) {
    //checks between first or second row, if less than swatch.length - first row.
    if (i < swatch.length) {
      //append here access by i
      row1.appendChild(swatch[i]);
    } else {
      row2.appendChild(swatch[i]);
    }
  }

  //
  topbar.appendChild(row1);
  topbar.appendChild(row2);

  document.getElementById('topbar').appendChild(topbar);
}










//SWATCH

//make grid of buttons with different colors

//add event listener to each button to assign selColor



//ADD BUTTON



//ERASE BUTTON


//Add swatch, add, and erase buttons to topbar's innerHTML

