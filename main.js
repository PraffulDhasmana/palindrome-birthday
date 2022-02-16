function reverseStr(str) {

    var listOfChars = str.split(''); // .split to split string into array
    var reverseListOfChars = listOfChars.reverse();

    var reverseStr = reverseListOfChars.join(''); // .join to join values in array

    return reverseStr;
}

function isPalindrome(str) {

    var reverse = reverseStr(str);

    return str === reverse
}

function convertDateToString(date) {
    var dateStr = {
        day: '',
        month: '',
        year: ''
    };

    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}


function getAllDateFormats(date) {
    var dateStr = convertDateToString(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    return [ddmmyyyy, mmddyyyy, yyyymmdd, yymmdd, mmddyy, ddmmyy];
}


function checkPalindromeForAllDateFormats(date) {
    var listOfPalindrome = getAllDateFormats(date);

    var flag = false;

    for (var i = 0; i < listOfPalindrome.length; i++) {
        if (isPalindrome(listOfPalindrome[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}


function isleapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }

    return false;
}


function getNestDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if (month === 2) { //check for feb
        if (isleapYear(year)) {
            if (day > 29) {
                day = 1;
                month++
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } 

    else {
        //check is the day exceeds the max days in month
        if (day > daysInMonth[month - 1]){
            day = 1;
            month++;
        }
    }
    if (month >12){
        month = 1;
        year++
    }

    return {
        day : day,
        month: month,
        year: year
    };
}


function getNestPalindrome(date) {

    var ctr = 0;
    var nextDate = getNestDate(date);

    while(1){
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate)
        if(isPalindrome){
            break
        }
        nextDate = getNestDate(nextDate);
    }

    return [ctr,nextDate];
}


var dateInput = document.querySelector('#date-input');
var calBtn = document.querySelector('#cal-btn');
var resulRef = document.querySelector('#result');

function clickHandler(){
    var bDayStr = dateInput.value;

  
    if (bDayStr !== ''){
        var listOfDate = bDayStr.split('-');
        var date = {
            day : Number(listOfDate[2]),
            month : Number(listOfDate[1]),
            year : Number(listOfDate[0])
        }
        
        var isPalindrome = checkPalindromeForAllDateFormats(date);

        if(isPalindrome){
            resulRef.innerText = "Congrats ! Your birth day is palindrome !! 😃"
        }
        else{
            var  [ctr,nextDate] = getNestPalindrome(date);

            resulRef.innerText = `The next palindrome is ${nextDate.day}-${nextDate.month}-${nextDate.year}, You missed it by ${ctr} days ! 🙄`
        }
        
    }
    

}

addEventListener('click',clickHandler);