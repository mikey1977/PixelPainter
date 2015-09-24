//CANVAS


function PixelPainter(width, height) {

  this.grid = document.createElement('div');
  this.grid.className = "grid";
  this.topbar = document.createElement('div');
  var buttons = new Array;
  var swatch = new Array(16);
  var erase = document.createElement('button');
  var clear = document.createElement('button');
  var selected = 'white';
  var isPainting = isErasing = false;
  var lastButton = thisButton = null;
  var index = [];
  var painter = this;
  var move = document.createElement('button');
  var encode = document.createElement('button');
  var decode = document.createElement('button');

  //save array of colors
  var defColors = ['white', 'silver', 'gray', 'black','red',
                   'maroon', 'yellow', 'olive', 'lime', 'green',
                   'aqua', 'teal', 'blue', 'navy', 'fuchsia', 'purple'];

  //MAKE SWATCH BUTTONS
  erase.className = 'swatchButton';
  clear.className = 'swatchButton';
  encode.className = 'swatchButton';
  decode.className = 'swatchButton';

  erase.appendChild(document.createTextNode('Erase'));
  clear.appendChild(document.createTextNode('Clear'));
  encode.appendChild(document.createTextNode('Save Drawring'));
  decode.appendChild(document.createTextNode('Recall'));

  erase.addEventListener('click', function() {
    selected = 'white';
  });
  clear.addEventListener('click', function() {

    //create for loop to access all buttons
    for (var i = 0; i < width; i++) {
      for (var j = 0; j < height; j++) {
        buttons[i][j].style.background = 'white';
      }
    }
  });
  this.topbar.appendChild(erase);
  this.topbar.appendChild(clear);
  this.topbar.appendChild(encode);
  this.topbar.appendChild(decode);

  for (var i = 0; i < swatch.length; i++) {

    //create new buttons for swatch
    swatch[i] = document.createElement('button');
    swatch[i].className = 'button';

    //give background new colors based on i
    swatch[i].style.background = defColors[i];

    //add event listener
    swatch[i].addEventListener('click', function() {
      //sets current color to background
      selected = this.style.background;
    });
  }

  //this.grid BUTTONS AND EVENT LISTENERS
  //ties height to width creating second dimension
  for (var i = 0; i < width; i++) {
    buttons[i] = new Array(height);

    //creates buttons
    //add event listener to each button
    // handler function takes selected from swatch to change button selected
    for (var j = 0; j < height; j++) {
      // console.log(buttons[i][j]);
      buttons[i][j] = document.createElement('button');
      buttons[i][j].className = 'button';
      buttons[i][j].name = 'button';
      buttons[i][j].addEventListener('click', function() {

        //this refers to i, j position, set to selected which can be changed
        //isPainting is set to false, clicking changes to true
        isPainting = !isPainting;

        if (isPainting) {
          this.style.background = selected;
          if (this.style.background !== 'white') {

            index.push(this);
          }
        }
      });
      buttons[i][j].dataset.gridIndex = (i * width) + j;
      buttons[i][j].dataset.lastColor = 'white';
      buttons[i][j].addEventListener('mouseover', function() {
        if (isPainting) {
          if (this.style.background === selected && (lastButton === this || isErasing)) {
            lastButton.style.background = this.style.background = 'white';
            isErasing = true;
          } else {
            this.style.background = this.dataset.lastColor = selected;
            isErasing = false;
            index.push(this);
          }
          lastButton = thisButton;
          thisButton = this;
        }
      });
    }
  }

  //ADD BUTTONS TO DIV this.grid
  //make a div for each row to separate rows

  for (var i = 0; i < width; i++) {

    //making a div within a div
    var temp = document.createElement('div');

    for (var j = 0; j < height; j++) {

      //append to each div made
      temp.appendChild(buttons[i][j]);
    }
    this.grid.appendChild(temp);
  }
  this.grid.className = 'spacing';

  //add swatch buttons to HTML this.grid
  //make outside div - border of swatch [  ]

  //creates first column [ [...] ]
  var row1 = document.createElement('div');

  //creates second column [ [...] [...] ]
  var row2 = document.createElement('div');

  for (var i = 0; i < swatch.length; i++) {

    //checks between first or second row, if less than swatch.length - first row.
    if (i < swatch.length / 2) {

      //append here access by i
      row1.appendChild(swatch[i]);
    } else {
      row2.appendChild(swatch[i]);
    }
  }

  //
  this.topbar.appendChild(row1);
  row1.className = 'spacing';
  this.topbar.appendChild(row2);
  row2.className = 'spacing';
  var hr = document.createElement('hr');
  hr.className = 'spacing';
  this.topbar.appendChild(hr);

  encode.addEventListener('click', function() {
    window.location.hash = (painter.encode());
  });

  this.encode = function() {
    var str = '';
    for (var i = 0; i < index.length; i++) {
      var colorCode = defColors.indexOf(index[i].style.backgroundColor);
      var codeId = index[i].dataset.gridIndex;
      str += '#' + codeId + ':' + colorCode;
    }
    return str;
  };

  decode.addEventListener('click', function() {
    window.location.hash = painter.decode();
  });

  this.decode = function() {
    var j = index % width;
    var i = parseInt(index / width);
    index = (i * width) + j;
  };

}
PixelPainter.prototype.setup = function() {
  //add this.grid to content's innerHTML
  document.getElementById('pixelPainter').appendChild(this.topbar);
  document.getElementById('pixelPainter').appendChild(this.grid);
};


function popup() {
  alert("STOP SEARCHING FOR PORN!");
  alert("FOR GOD SAKES, YOU'RE IN A PUBLIC ENVIRONMENT!");
  alert("AT LEAST WAIT UNTIL YOU'RE AT HOME!");
  alert("DON'T EVEN THINK ABOUT SEARCHING FOR YIPPING!");
  alert("YOUR SEARCH HISTORY IS BEING SAVED!");
  alert("ALL OF YOUR FACEBOOK FRIENDS ARE BEING NOTIFIED!");
}

var painter = new PixelPainter(40, 80);
painter.setup();