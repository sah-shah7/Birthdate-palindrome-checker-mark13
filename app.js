const dateInputRef = document.querySelector("#d");
const checkBtnRef = document.querySelector("#check-btn");
const output = document.querySelector("#output");

output.innerText = "The result will be shown here.";

function checkBtnHandler() {
  let bdayStr = dateInputRef.value;

  if (bdayStr !== "") {
    let listOfDate = bdayStr.split("-");
    let date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };
    let isPalindrome = checkPalindromeForAllFormats(date);
    output.innerHTML = `
		<lottie-player src="https://assets10.lottiefiles.com/packages/lf20_4pbyzxfg.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>
		<p>Delivering Your Result, Stay Tuned...</p>
	`;
    setTimeout(() => {
      if (isPalindrome) {
        output.innerText = "How Lucky! Your Birthdate is Palindrome. Could you tell us about the next lottery numbers?";
      } else {
        let [count, nextDate] = getNextPalindromeDate(date);
        output.innerText = ` We bring you the result that your Birthday is not Palindrome :( | Nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}. You missed it by ${count} days.`;
      }
    }, 6000);
  } else {
    output.innerHTML = `
	 	<p>Enter valid date to continue.</p> 
	  `;
  }
}





function reverseStr(str) {
  return str.split('').reverse().join('')
}

function isPalindrome(str) {
  var reverse = reverseStr(str);
   if(str === reverse){
   	return true;
   }
  return false;
}

function convertDateToStr(date) {
  let dateStr = { day: "", month: "", year: "" };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
}

function getAllDateFormats(date) {
  let dateStr = convertDateToStr(date);

  let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllFormats(date) {
  let listOfAllDateFormats = getAllDateFormats(date);

  let flag = false;

  for (let i = 0; i < listOfAllDateFormats.length; i++) {
    if (isPalindrome(listOfAllDateFormats[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {
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

function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    // check for leap year
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  let count = 0;
  let nextDate = getNextDate(date);
  while (1) {
    count++;
    let isPalindromeFlag = checkPalindromeForAllFormats(nextDate);
    if (isPalindromeFlag) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }

  return [count, nextDate];
}



checkBtnRef.addEventListener("click", checkBtnHandler);