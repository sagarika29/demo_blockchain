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
 
  $('td input[name=date1]').on('change', function() {
     $('#candidateName').val(($('input[name=date1]:checked', 'td').val())); 
    console.log($('#candidateName').val());
 });

  function openNav() {
    // document.getElementById("myNav").style.height = "80%";
    // $(".overlay").css("display", "block");
    $('#myModal').modal('show');
    
  }
  
 $(document).on('click','#ticketPurchase',function(event) {
  console.log("IN event")
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
    openNav();
    }).catch(function() {
    // Error
  });
});

});
