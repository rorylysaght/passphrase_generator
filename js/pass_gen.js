// Random Passphrase Generator
// Opens csv list containing 2 lists of adjectives and 1 list of nouns
// Add numeral and special character if required for password policy
// Author: Rory MacLysaght rorylysaght(at)gmail(dot)com

var list_a = [];
var list_b = [];
var list_c = [];
var list_d = ['!','@','#','$','%','^','&','*','(',')','_','-','+','=','?','~'];

function readLines(x){
  var lines = x.split('\n');
  //alert(lines[0])
  for(var i = 0;i < lines.length;i++){
    var myline = lines[i].split(',');
    list_a.push(myline[0]);
    list_b.push(myline[1]);
    list_c.push(myline[2]);
      //code here using lines[i] which will give you each line
  }
}

function getRandomString() {
  // Math.floor(Math.random() * 100);     // returns a random integer from 0 to 99
  rand_a = Math.floor(Math.random() * list_a.length); // 0 to 174
  rand_b = Math.floor(Math.random() * list_b.length);
  rand_c = Math.floor(Math.random() * list_c.length);

  passPhrase = list_a[rand_a] + list_b[rand_b] + list_c[rand_c].trim();
  xkcdEntropy = 33;

  // Add special characters?
  if (document.getElementById('char').checked == true) {
    var rand_d = Math.floor(Math.random() * list_d.length);
    passPhrase += list_d[rand_d];
    xkcdEntropy += 4;
  }
  // Add numbers?
  if (document.getElementById('num').checked == true) {
    var rand_e = Math.floor(Math.random() * 10);
    passPhrase += rand_e;
    xkcdEntropy += 3;
  }

  //document.getElementById('debug').innerHTML = rand_a+" "+rand_b+" "+rand_c+" "+rand_d+" "+rand_e
  document.getElementById('passphrase').innerHTML = passPhrase;
  document.getElementById('passLength').innerHTML = passPhrase.length;
  document.getElementById('xkcd').innerHTML = xkcdEntropy;

  check_password(passPhrase);
}

//
// Read local text/csv file
var strCsv = "";
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
if (xhr.readyState == 4 && xhr.status == 200) {
  //document.getElementById('placeholder').innerHTML = xhr.responseText;
  strCsv = xhr.responseText;
  readLines(xhr.responseText);
}
}
xhr.open('GET', 'pass_list.csv');
xhr.send();
// finish open text file
