// =================================================
// Calculate password strength and show the strength meter.
// From: http://passwordmeter.sourceforge.net/

function check_password(pwd)
{
    var span_head = document.getElementById("pwd_head");		// Where the header info appears
    var span_log = document.getElementById("pwd_log");		// Where the debug info appears
    var span_bar = document.getElementById("pwd_bar");		// Where the colored strength bar appears
    var span_meter = document.getElementById("pwd_meter");	// Where the strength word appears

    var floatEntropy;		// Maximum possible combinations of password characters
    var intBase = 0;		// Total number of characters in the character sets used in the password
    var intPwdLen;		// length of the password
    var strUnique="";		// Sort of unique characters used, I count no more than 2 of each
    //var intUniqueLen=0;		// Length of "unique" character string, allowing 2 of each character max
    var intStrength = 0;	// Calculated password strangth
    var x;			// General counter
	var strDesc;
	var strUniqueLen;

    var barWidth;		// Current width and color of the bar
    var barColor;

    var DEBUG=1;    		// Set to 1 for debug output


    intPwdLen = pwd.length;	// Length of typed password

    // Entropy space determined by number of possible combinations
    // of character sets, 26 each for upper an lower case letters,
    // 10 for digits, 33 for special characters.

    // Lowercase letters - there are 26 possibilities

    if (pwd.match(/[a-z]/))
    {
        intBase = intBase + 26;
    }

    // Uppercase = 26

    if (pwd.match(/[A-Z]/))
    {
        intBase = intBase + 26;
    }

    // Digits = 10

    if (pwd.match(/[0-9]/))
    {
        intBase = intBase + 10;
    }

    // Special characters = 33

    if (pwd.match(/[\W_]/))
    {
        intBase = intBase + 33;
    }

    // Strip out duplicate bytes (allow 2 only) to avoid passwords like aaaaaaaaaaaaaaaaaa or 123123123123
    // Don't use regex because special characters mess it up

    for (x = 0; x < intPwdLen; x++)
    {
        var intMatches = 0;
        for (var i = x+1; i < intPwdLen; i++)
        {
            if (pwd.charAt(x) == pwd.charAt(i))
                intMatches = intMatches + 1;
        }
        if (intMatches < 2)
            strUnique = strUnique + pwd.charAt(x);
    }
    strUniqueLen = strUnique.length;

    // Entropy for only unique bytes in password

    floatEntropy = Math.pow(intBase, strUniqueLen);

    // Calculate pwd strength as the exponent of entropy

    x = floatEntropy;
    while (x >= 10) {
        intStrength = intStrength + 1;
        x = x / 10;
    }

    // Scale from 0 - 50, max strength is 50

    if (intStrength > 50) intStrength = 50;

    // Convert strength into words and colors.
    // If you want to evaluate strength differently
    // you can change this section.

    if (intStrength == 0) strDesc = "";
    else if (intStrength <= 7)
    {
        strDesc = "Weak";
        barColor = "Red";
    }
    else if (intStrength <= 14)
    {
        strDesc = "Fair";
        barColor = "Orange";
    }
    else if (intStrength <= 20)
    {
        strDesc = "Good";
        barColor = "yellow";
    }
    else if (intStrength <= 30)
    {
        strDesc = "Strong";
        barColor = "GreenYellow";
    }
    else if (intStrength > 30)
    {
        strDesc = "Very strong";
        barColor = "Green";
    }

    // Output debug/information text

    if (DEBUG)
    span_head.innerHTML = "<p>From <a href='http://passwordmeter.sourceforge.net/' target='_blank'>Entropy Based Password Strength Meter:</a></p>";
  span_log.innerHTML = "<br>Length is " + intPwdLen + ". "
        + "<br>Unique string is " + strUnique + " with length " + strUniqueLen + "."
        + "<br>Password strength is " + intStrength + ".";

    // Show strength meter bar

    barWidth = intStrength * 4;     // Scale up to 200px width

    span_bar.innerHTML = "";
    span_bar.style.width=barWidth + "px";
    span_bar.style.height="8px";
    span_bar.style.border="1px solid gray";
    span_bar.style.backgroundColor=barColor;
    span_bar.style.margin="0px";
    span_bar.style.padding="0px";

    // Show the strength word

    span_meter.innerHTML = strDesc + "&nbsp;";

    // Return password strengh

    if (intPwdLen > 0)
        return(intStrength);
}
