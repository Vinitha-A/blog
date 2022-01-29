let baseurl = "https://salesforce-blogs.herokuapp.com/blogs/api/";
let id;
let title;
let text;
async function fetchPostList() {
    let response = await fetch(baseurl);
    let data = await response.json();
    return data;
}




function buildlist() {
    // let listdata = fetchPostList();

    fetchPostList().then(function (listdata) {


        for (let i = 0; i < listdata.length; i++) {
            var date = new Date(listdata[i].timestamp);
            var modifieddate = date.getDate() + "-" + date.getMonth()+1 + "-" + date.getFullYear();
            let item = `<li class="articleitem">${modifieddate} - ${listdata[i].title}</li> `
            $('.leftlist').append(item);

            id= listdata[i].id, title = listdata[i].title,text= listdata[i].text;
            let detailitem= 
            `<div class="top"><span class="title">${listdata[i].title}   </span><span class="date">${modifieddate}</span></div>
            <div class="content">${listdata[i].text}</div>
            <div class="btns"><button onclick="editpost()">Edit</button><button onclick="deletepost(${listdata[i].id})">Delete</button></div>
            `;

            $("#postdetail ul").append(detailitem);
        }
        // document.getElementById('postlist').appendChild(liststructure);
    })
}
buildlist();
$("#popup").hide();

function createPost() {
    $("#popup").show()
}

function savepost() {
    let title = $("#posttitle").val();
    let text = $("#posttext").val();

    let payload = {"text":text,"title":title};
 
// data.append( "json", JSON.stringify( payload ) );

    fetch(baseurl,
        {
            method: "POST",
            body: JSON.stringify(payload)
        })
        .then(function (data) { alert(JSON.stringify(data)) })
        .catch(function(err){console.log(err)})
}

function closeSaveForm() {
    $("#createForm").hide();
}

function editpost(){
    openPopUp();
     $("#posttitle").val(title);
    $("#posttext").val(text);

  
    let payload = {"text":text,"title":title};

    fetch(baseurl/id,
        {
            method: "POST",
            body: JSON.stringify(payload)
        })
        .then(function (data) { alert(JSON.stringify(data)) })
        .catch(function(err){console.log(err)})
}
    


function deletepost(id){
    fetch(baseurl/id,
        {
            method: "DELETE",
            body: JSON.stringify(payload)
        })
        .then(function (data) { alert(JSON.stringify(data)) })
        .catch(function(err){console.log(err)})
}











function openPopUp()
{
 
 $("#popup").show();
 $("article").hide();
 $("section").hide();

}


function closePopUp()
{
    $("#popup").hide();
    $("article").show();
    $("section").show();
}