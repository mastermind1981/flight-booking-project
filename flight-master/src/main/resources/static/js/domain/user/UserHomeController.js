angular.module('app').controller('UserHomeController', ['$window', '$routeParams', '$localStorage', '$filter', '$interval', 'UserService', 'FlightService', 'ItineraryService', 
	function($window, $routeParams, $localStorage, $filter, $interval, UserService, FlightService, ItineraryService){
	
	ctrl = this;
	
	ctrl.$storage = $localStorage;
	
	ctrl.hideFlights = false;
	ctrl.hideItineraries = true;
	
	ctrl.logout = function(){
		$localStorage.loggedIn = false;
		$localStorage.username = undefined;
		$localStorage.userId = undefined;
		ctrl.$storage = $localStorage;
		$window.location = "#/home";
	}
	
	ctrl.origin = "";
	ctrl.destination = "";
	
	var modelFlights;
	
	var availableItineraries = new Array();
	
	function PriorityQueue () {
	  this._nodes = [];

	  this.enqueue = function (priority, key) {
	    this._nodes.push({key: key, priority: priority });
	    this.sort();
	  }
	  this.dequeue = function () {
	    return this._nodes.shift().key;
	  }
	  this.sort = function () {
	    this._nodes.sort(function (a, b) {
	      return a.priority - b.priority;
	    });
	  }
	  this.isEmpty = function () {
	    return !this._nodes.length;
	  }
	}

	/**
	 * Pathfinding starts here
	 */
	function Graph(){
	  var INFINITY = 1/0;
	  this.vertices = {};

	  this.addVertex = function(name, edges, addEdge){
		if(addEdge){
			this.vertices[name][edges.destination] = edges.flightTime;
		}else{  
			this.vertices[name] = edges;
		}
	  }

	  this.shortestPath = function (start, finish) {
	    var nodes = new PriorityQueue(),
	        distances = {},
	        previous = {},
	        path = [],
	        smallest, vertex, neighbor, alt;

	    for(vertex in this.vertices) {
	      if(vertex === start) {
	        distances[vertex] = 0;
	        nodes.enqueue(0, vertex);
	      }
	      else {
	        distances[vertex] = INFINITY;
	        nodes.enqueue(INFINITY, vertex);
	      }

	      previous[vertex] = null;
	    }

	    while(!nodes.isEmpty()) {
	      smallest = nodes.dequeue();

	      if(smallest === finish) {
	        path;

	        while(previous[smallest]) {
	          path.push(smallest);
	          smallest = previous[smallest];
	        }

	        break;
	      }

	      if(!smallest || distances[smallest] === INFINITY){
	        continue;
	      }

	      for(neighbor in this.vertices[smallest]) {
	        alt = distances[smallest] + this.vertices[smallest][neighbor];

	        if(alt < distances[neighbor]) {
	          distances[neighbor] = alt;
	          previous[neighbor] = smallest;

	          nodes.enqueue(alt, neighbor);
	        }
	      }
	    }

	    return path;
	  }
	}
	
	FlightService.getLocations().then(function(data){
		ctrl.locations = data.data.responseData;
		
	})
	
	ctrl.getFlightsFromService = function(){
		FlightService.getFlights().then(function(data){
		modelFlights = data.data;
		ctrl.flights = data.data;
		ctrl.flights.sort(function(a,b){
			 return a.offset - b.offset;
		});
		modelFlights.sort(function(a,b){
			 return a.offset - b.offset;
		});
		
		})
	};
	
	ctrl.getFlightsFromService();
	//$interval(ctrl.getFlightsFromService, 2000);
	
	ItineraryService.getItineraries($routeParams.id).then(function(data){
		ctrl.itineraries = data.responseData;
	})
	
	ctrl.changeOrigin = function(){
		
		if(ctrl.origin == "" || ctrl.destination == ""){
			return;
		}
		filterFlights();
	}
	
	ctrl.changeDestination = function(){
		if(ctrl.origin == "" || ctrl.destination == ""){
			return;
		}else if(ctrl.origin == ctrl.destination){
			alert("Your destination and origin cannot be the same");
			return;
		}
		filterFlights();
	}
	
	
	ctrl.book = function(flight){
		//alert(JSON.stringify(flight));
		ItineraryService.createItinerary(ctrl.$storage.username, "password").then(function(data){
			
			var newItinerary = data.responseData;
			flight.flights.forEach(function(current){
				//alert(JSON.stringify(current));
				
				ItineraryService.addFlightToItinerary(current.origin, current.destination, current.flightTime, current.offset, newItinerary.id, $routeParams.id)
				.then(function(data){
					//alert(JSON.stringify(data));
				});
			})
			alert("Pack your bags. Your trip is booked!")
			$window.location = "#/home";
		});
		
	}
	
	var filterFlights = function(){
		
		modelFlights.sort(function(a,b){
			 return a.offset - b.offset;
		});
		
		var g = new Graph();
		
		ctrl.locations.forEach(function(current){
			g.addVertex(current.city, new Object(), false);
		});
		
		modelFlights.forEach(function(current){
			g.addVertex(current.origin, current, true);
		});
		//alert(JSON.stringify(g.vertices));
		var arrPaths = g.shortestPath(ctrl.origin, ctrl.destination).concat([ctrl.origin]).reverse();
		
		if(arrPaths.length < 2){
			//alert("no available routes for your flight itinerary");
			return;
		}else{
			try{
			var availableItineraries = new Array();
			
			
			var itinerary = new Object();
			
			var flights = new Array();
			arrPaths.forEach(function(current, idx, arr){
				var found = false;
				modelFlights.forEach(function(currentFlight, idxFlight, arrayFlight){
					if(!found){
						if(currentFlight.origin === current && currentFlight.destination === arr[idx +1]){
							
							flights.push(currentFlight);
							found = true;
							
						}
					}
				});
				
			});
			itinerary["flights"] = flights;	
			availableItineraries.push(itinerary);
			//alert(JSON.stringify(availableItineraries));
			}catch(err){
				alert(err);
			}
		}
		ctrl.hideFlights = true;
		ctrl.filteredItineraries = availableItineraries;
		ctrl.hideItineraries = false;
		
		
		
	}
	function createItinerary(flight){
		ctrl.flights.reduce(function(prev, curr){
			if(curr.origin == ctrl.origin && curr.destination == ctrl.destination){
				itinerary.push(current);
			}else if(curr.origin == prev.destination){
				itinerary.push(curr);
			}
		});
	}
	
	

}]);