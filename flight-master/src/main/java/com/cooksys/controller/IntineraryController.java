package com.cooksys.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.entity.Itinerary;
import com.cooksys.entity.User;
import com.cooksys.entity.UserFlight;
import com.cooksys.pojo.AddFlightRequest;
import com.cooksys.service.ItineraryService;
import com.cooksys.transaction.RequestTransaction;
import com.cooksys.transaction.ResponseTransaction;
import com.fasterxml.jackson.annotation.JsonFilter;

@RestController
@RequestMapping("itinerary")
public class IntineraryController {
	@Autowired
	private ItineraryService itineraryService;
	
	@RequestMapping(value = "/{itineraryid}")
	public ResponseTransaction<Itinerary> getByItineraryId(@PathVariable("itineraryid") long id){
		return itineraryService.getItineraryById(new RequestTransaction<Long>(id)); 
	}
	
	@RequestMapping(value = "/user/{userid}")
	public ResponseTransaction<List<Itinerary>> getByUserId(@PathVariable("userid") long id){
		return itineraryService.getUserItineraries(new RequestTransaction<Long>(id)); 
	}
	
	@CrossOrigin
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public ResponseTransaction<Itinerary> addFlight(@RequestBody RequestTransaction<AddFlightRequest> request){
		return itineraryService.addFlightToItinerary(request);
	}
	
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseTransaction<Itinerary> createItinerary(@RequestBody RequestTransaction<User> request){
		return itineraryService.createItinerary(request);
	}
	
	
}
