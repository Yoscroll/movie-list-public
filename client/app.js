
 console.log("hi");
let getImg = () => $.ajax({
  	url: 'https://6lb8vtwq51.execute-api.us-west-2.amazonaws.com/dev/get',
  	type: 'GET',
  	success: (data) => (buildHtmlElements(data.message.fields), console.log(data)),
  });

let buildHtmlElements = (responseData) =>(
	responseData.map((info)=>{
		/*$('#dataTable').append(`
			<tr>
			    <th>${info.id}</th>
			    <th>${info.title}</th>
			    <th>${info.year}</th>
			    <th>${info.genre}</th>
  			</tr>`)*/
  			console.log(info);
    })
);
getImg();
