'use strict';

const myAPI_Key= 'RzDxuHnBlpeqCFfWUYmyPfUwwJr6iHkbaPfaNSkR'

function handleSearchClick() {
  $('button').click( function(e) {
    e.preventDefault();
    const state = document.getElementById('search').value.replace(/\s/g, "");
    const max = document.getElementById('resultNum').value.replace(/\s/g, "");
    getData(state, max)
  })
}

function getData(state, max) {
  if (state === "") {
    $('.js-err').text('You have to enter a state.')
  }else {
    $('.js-err').empty();
    fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${state}&limit=${max}&api_key=${myAPI_Key}`)
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.total === "0") {
        $('.js-err').text('make sure you enter the correct initials of the state you are searching')
      }else {
        $('.js-results').removeClass('hidden');
        $('.js-err').empty();
        displayData(responseJson)
      }
    })
    .catch(err => $('.js-err').text(`Something went wrong: ${err.message}`))
  }
}

function displayData(json) {
  $('.js-list').empty();
  console.log(json);
  for (let i = 0; i < json.data.length; i++) {
    $('.js-list').append(`
    <li>
      <h3><a href="${json.data[i].url}" target="_blank">${json.data[i].fullName}</a></h3>
      <p> Located in ${json.data[i].states}
      <p>${json.data[i].description}</p>
      <p>${json.data[i].directionsInfo} Look <a href=${json.data[i].directionsUrl} target="_blank">here</a> for more information on how to get there.</p>
    </li>`);
  };
}

function init() {
  handleSearchClick()
}

init()

