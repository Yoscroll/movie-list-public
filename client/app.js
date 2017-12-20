
console.log("hi");
let getMovie = () => $.ajax({
  	url: 'https://6lb8vtwq51.execute-api.us-west-2.amazonaws.com/dev/get',
  	type: 'GET',
  	success: (data) => buildHtmlElements(data.message.rows),
 });

let buildHtmlElements = (responseData) =>(
	responseData.map((info)=>{
		$('#dataTable').append(`
			<tr>
			    <th>${info.id}</th>
			    <th>${info.title}</th>
			    <th>${info.year}</th>
			    <th>${info.genre}</th>
  			</tr>`)
  			console.log(info);
    })
);
getMovie();

const newMovie = {
  id: "default"   ,
  title: "added movie",
  year: 1938,
  genre: "comedy"
}
let postMovie = () => $.ajax({
  type: "POST",
  url: 'https://6lb8vtwq51.execute-api.us-west-2.amazonaws.com/dev/post',
  data:  JSON.stringify(newMovie),
  contentType: "application/json; charset=utf-8",
  dataType: "json"
});
