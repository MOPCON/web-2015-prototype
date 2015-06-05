var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var MopconIntro = React.createClass({
	getInitialState: function() {
		return {
			data:[],
			dataTemp: {},
			photoCounts: 10,
			photoChangeTimer: 10000,
			currentCount: 0
		};
	},
	changePhoto: function(){
		var updatePhotos = this.state.data;
		
		tempPhoto = updatePhotos[0]
	    // updatePhotos.splice(updatePhotos.length - 1, 1);
	    updatePhotos.push(tempPhoto);
	    // console.log(updatePhotos);
	    this.setState({data: updatePhotos});
	    setTimeout(function(){ 
	    	// updatePhotos.unshift(tempPhoto);
	    	updatePhotos.splice(0, 1);
			this.setState({data: updatePhotos});
			// console.log(updatePhotos);
	    }.bind(this), 600);
	    
	    //add one photo
	    
	},
	componentDidMount: function() {
		photos = [];
		// api link https://www.flickr.com/services/api/explore/flickr.groups.pools.getPhotos
		// var flickerAPI = "https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=6534b52dffe2164a73b1388299b36461&group_id=2768675%40N23&per_page=500&page=2&format=json&api_sig=07241605a5653d9e4ac18c4344722722";
		var flickerAPI = "https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=6534b52dffe2164a73b1388299b36461&group_id=2768675%40N23&per_page=500&page=2&format=json&nojsoncallback=1&api_sig=1253d9df799c3d5d7fe6fcd580ef0236";
		$.getJSON( flickerAPI, {
			format: "json"
		}).done(function( data ) {
			perpagePhoto = data.photos.photo.length;
			photoCounts = this.state.photoCounts;
			imgSize = "z"
			for (var i = photoCounts - 1; i >= 0; i--) {
				photosNum = Math.floor((Math.random() * perpagePhoto));
				url = 'https://farm'+ data.photos.photo[photosNum].farm +'.staticflickr.com/'+ data.photos.photo[photosNum].server +'/'+ data.photos.photo[photosNum].id +'_'+ data.photos.photo[photosNum].secret +'_' + imgSize + '.jpg';
				
				photo = {
					'url': url
				}
				photos.push(photo);
			};
			this.setState({
				'dataTemp': data,
				'data': photos
			});
		}.bind(this));
		setInterval(function(){
			this.changePhoto();
		}.bind(this), this.state.photoChangeTimer);
	},
	render: function() {
		var items = this.state.data.map(function(photo, i) {
			bgstyle = {
				backgroundImage: 'url(' + photo.url + ')',
			}
			return (
				<li style={bgstyle} ref={'photo_'+ i +''} className={'list'}>
				</li>
			)
		}.bind(this)); 
		return (
			<ul className="list-bg">
				<ReactCSSTransitionGroup transitionName="reactAnimation">
					{items}
				</ReactCSSTransitionGroup>
			</ul>
		);
	}
})
if (document.getElementById('mopcon')){
	React.render(
		<MopconIntro />,
		document.getElementById('mopcon')
	);	
}
