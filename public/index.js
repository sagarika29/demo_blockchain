$(document).ready(function() {
  fetch('/candidates')
  .then(res => res.json())
  .then(res => {
    const candidatesTableHTML = res.candidates.map(function(candidate) {
      return `<tr><td>${candidate.name}</td><td id='${candidate.name}'>${candidate.tickets}</td></tr>`;
    });

    $('#candidatesTable').html(candidatesTableHTML);
  }).catch(function(err) {
    // Error :(
  });

  $('#ticketPurchase').click(function(event) {
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    fetch('/ticket', {
      method: 'post',
      headers: headers,
      body: JSON.stringify({ candidateName: $('#candidateName').val() }),
    })
    .then(res => res.json())
    .then(res => {
      $('#' + res.name).html(res.tickets);
      $("#candidateName").val("");
    }).catch(function() {
      // Error
    });
  });
});