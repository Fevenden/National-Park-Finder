'use strict';

const myAPI_Key= 'RzDxuHnBlpeqCFfWUYmyPfUwwJr6iHkbaPfaNSkR'

function handleSearchClick() {
  $('button').click( function(e) {
    e.preventDefault();
    $('.js-results').removeClass('hidden');
    const state = document.getElementById('search').value.replace(/\s/g, "");
    const max = document.getElementById('resultNum').value.replace(/\s/g, "");
    getData(state, max)
  })
}

function getData(state, max) {
  fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${state}&limit=${max}&api_key=${myAPI_Key}`)
  .then(response => response.json())
  .then(responseJson => displayData(responseJson))
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

