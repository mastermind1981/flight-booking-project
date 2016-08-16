angular.module('app').service('FlightService', ['$http', function($http) {
	
	this.getFlights = function(){
		return $http.get('flights');
	};
	
	this.getLocations = function(){
		return $http.get('location');
	};
	
	this.getLocationById = function(id){
		return $http.get('location/' + id);
	};
	
	this.getMarkerByCityName = function(map, name) {

		//Send city name param to URL
		return $http.get('location/name', {params: { name : name }}).then(function(result) {
			return new google.maps.Marker({
				map : map,
				position : {
					
					//Use + to turn string to number
					lat : +result.data.latitude,
					lng : +result.data.longitude
				}
			});
		})

	}
	
	this.getItineraries = function(locations, flights, origin, destination){
		
		function Graph(v) {
			//var thisGraph = this;
			this.vertices = v;
			this.edges = 0;
			this.adj = [];
			this.addEdge = addEdge;
			this.showGraph = showGraph;
			this.dfs = dfs;
			this.marked = new Object();
			this.adjLocations = new Object();
			
			locations.forEach((current) => {
				//alert(JSON.stringify(current));
				try{
					this.adjLocations[current.city] = new Array();
					this.marked[current.city] = false;
				}catch(err){
					alert(err);
				}
			});
			alert(JSON.stringify(this.adjLocations));
			
		}
		function addEdge(v,w) {
			//this.adj[v].push(w);
			//this.adj[w].push(v);
			this.adjLocations[v].push(w);
			this.edges++;
			//alert(JSON.stringify(this.adj));
		}
		
		function showGraph() {
			alert(JSON.stringify(this.adjLocations));
			for (var i = 0; i < this.vertices; ++i) {
				this.adjLocations[locations[i].city] = new Array();
				for (var j = 0; j < this.vertices; ++j) {
					if (this.adj[i][j] != undefined){
						//alert(this.adj[i][j] + ' ');
						//alert(locations[i].city + '->' + locations[j].city);
						this.adjLocations[locations[i].city].push(locations[j].city);
					}
					
				//print();
				}
			}
			alert(JSON.stringify(this.adjLocations));
			
		}
		
		function dfs(v) {
			this.marked[v] = true;
			if (this.adjLocations[v].length != 0) {
				alert("Visited vertex: " + JSON.stringify(v));
			}
			this.adjLocations[v].forEach(function(w){
				if (!this.marked[w.origin]) {
					this.dfs(w.destination);
				}
			});
		}
		
		function getLocationIndex(location_name, locations){
			
			var num = 0;
			for(var i = 0; i < locations.length; i++){
				if(location_name == locations[i].city){
					num = i;
				}
			}
			return num;
		}
		
		var g = new Graph(locations.length);
		
		flights.forEach(function(current){
			//g.addEdge(getLocationIndex(current.origin, locations), getLocationIndex(current.destination, locations));
			g.addEdge(current.destination, current);
		});
		alert(JSON.stringify(g.adjLocations));
		g.dfs(destination);
		try{
			g.dfs(destination);
		//g.showGraph();
		}catch(err){
			alert(err);
		}
		
		
	}
	
	
}])