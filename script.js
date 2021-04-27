function dodajEl(alb, images)
{
    let div = $("<div class='row mt-4 justify-content-center'>");
    if(images)
    {
        let divS = $("<div class='col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-1'>");
        divS.append($('<img/>').attr(
            {src: images.images[0].thumbnails['small']}
        ));
        div.append(divS);
    }
    else
    {
        div.append("<br>");
    }
    let divB = $("<div class='col-sm-12 col-md-2'>");
    divB.append($('<input>').attr(
        {   type: 'button',
            class: 'btn btn-primary btn-sm',
            value: alb.title + ", " + alb['artist-credit'][0].name + ", " + alb['track-count'] + " tracks"
        }).click(function(){
            window.location.href = "sorter.html?id=" + alb.id;
        })
        );
    // let potSlike = `<div><img src=${images.images[0].thumbnails['small']}></div>`;
    // console.log(potSlike);
    div.append(divB);
    $("#slike").prepend(div);
}

$("#confirm").click(() => {
    let q = "";
    if($("#album").val()){
        q = `release:${$("#album").val()}`;
    }
    if($("#artist").val())
    {
        if(q)
            q += " AND ";
        q += `artist:${$("#artist").val()}`;
    }

    $("#slike").empty();
    let obj = {
        query: q,
        limit: 5,
        fmt: "json"
    }
    let urlLink = "https://musicbrainz.org/ws/2/release/?" + $.param( obj );
    console.log(urlLink);
    $.get(urlLink, (data) => {
        for(let alb of data.releases)
        {
            $.get("https://coverartarchive.org/release/" + alb.id, (images, err) => {
                dodajEl(alb, images);
            }).fail(function(){dodajEl(alb, false)});
        }
    })
})

function pressEnter(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("confirm").click();
    }
}

$("#album").keyup(pressEnter);
$("#artist").keyup(pressEnter);