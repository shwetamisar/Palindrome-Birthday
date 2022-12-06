let inputDate = document.querySelector("#input-date");
let buttonCheck = document.querySelector("#btn-check");
let outputMessage = document.querySelector("#output-message");

buttonCheck.addEventListener("click", onClickHandle);

function onClickHandle() {
  
    let input = inputDate.value.split("-"); // YYYY-MM-DD
  

  let date = {
    day: parseInt(input[2]),
    month: parseInt(input[1]),
    year: parseInt(input[0]),
  };

  let flag = checkIfPalindrome(date);
  displayMessage(flag, date);
}

function convertToDateFormat(date) {
  let dateString = numberToString(date);
  let mmddyyyy = dateString.day + dateString.month + dateString.year; // fORMAT-MM/DD/YYYY
  return mmddyyyy;
}

function reverseDate(date) {
  let reverseInput = date.reverse();
  let reverseDate = reverseInput.join("");
  return reverseDate;
}
function numberToString(mydate) {
  dateString = { day: "", month: "", year: "" };
  if (mydate.day < 10) {
    dateString.day = "0" + mydate.day.toString();
  } else {
    dateString.day = mydate.day.toString();
  }
  if (mydate.month < 10) {
    dateString.month = "0" + mydate.month.toString();
  } else {
    dateString.month = mydate.month.toString();
  }

  dateString.year = mydate.year.toString();

  return dateString;
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
  let leap = isLeapYear(year);
  if (month == 2) {
    //leap year
    if (leap) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      //not a leap year
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      //month=3 but in array index it is 2
      month = month + 1;
      day = 1;
    }
  }

  if (month > 12) {
    year++;
    month = 1;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function nextPalindromeDate(date){
  let counter = 0;
  let nextDate = getNextDate(date);


  while(1)
  {
    counter++;
    let isPalindrome=checkIfPalindrome(nextDate);
    if(isPalindrome)
    {
      break;
    }
    nextDate=getNextDate(nextDate);
    
  }
   return [counter,nextDate]
  
}
function checkIfPalindrome(date){
  let formatedDate = convertToDateFormat(date);
  let flag = false;
  let reverseInputDate = reverseDate(formatedDate.split(""));
  if (formatedDate === reverseInputDate) {
    flag = true;
  }

  return flag;
}

function displayMessage(flag, date){
  if (flag) {
    outputMessage.style.display = "block";
    outputMessage.innerText = "Yay! your birthday is palindrome";
    outputMessage.className = "output";
    outputMessage.className =
      "output mt-3 d-flex justify-content-center font-weight-bold rounded";
    outputMessage.style.backgroundColor = "greenyellow";
  } else {
      
    let [counter, nextDate] = nextPalindromeDate(date);
    console.log(counter,nextDate)
    outputMessage.style.display = "block";
    outputMessage.innerText = `Ahh! you missed it by ${counter} days.Next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}`;
    outputMessage.className =
      "output mt-3 d-flex justify-content-center font-weight-bold rounded";
    outputMessage.style.backgroundColor = "orange";
  }
}