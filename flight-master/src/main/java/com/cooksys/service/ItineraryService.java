package com.cooksys.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cooksys.entity.Itinerary;
import com.cooksys.entity.User;
import com.cooksys.entity.UserFlight;
import com.cooksys.pojo.AddFlightRequest;
import com.cooksys.repository.ItineraryRepository;
import com.cooksys.repository.LocationRepository;
import com.cooksys.repository.UserFlightRepository;
import com.cooksys.repository.UserRepository;
import com.cooksys.transaction.RequestTransaction;
import com.cooksys.transaction.ResponseTransaction;

@Service
public class ItineraryService {
	@Autowired
	ItineraryRepository itineraryRepo;
	@Autowired
	UserFlightRepository userFlightRepo;
	@Autowired
	UserRepository userRepo;
	@Autowired
	LocationRepository locationRepo;
	
	public ResponseTransaction<List<Itinerary>> getUserItineraries(RequestTransaction<Long> request){
		List<Itinerary> itineraries = itineraryRepo.findByUser(userRepo.findById(request.getRequestData()));
		itineraries.forEach((g)->g.getUserFlights().forEach((f) -> f.setItinerary(null)));
		return new ResponseTransaction<List<Itinerary>>(itineraries, "success", false);
	}
	
	
	public ResponseTransaction<Itinerary> addFlightToItinerary(RequestTransaction<AddFlightRequest> request){
		
		UserFlight userFlight = new UserFlight();
		userFlight.setUser(userRepo.findById(request.getRequestData().getUserId()));
		userFlight.setDestination(locationRepo.findByCity(request.getRequestData().getDestination()));
		userFlight.setOrigin(locationRepo.findByCity(request.getRequestData().getOrigin()));
		userFlight.setItinerary(itineraryRepo.findById(request.getRequestData().getItineraryId()));
		userFlight.setFlightTime(request.getRequestData().getFlightTime());
		userFlight.setOffSet(request.getRequestData().getOffSet());
		userFlightRepo.save(userFlight);
		long itineraryId = userFlight.getItinerary().getId();
		Itinerary itinerary = itineraryRepo.findById(itineraryId);
		itinerary.getUserFlights().forEach((f) -> f.setItinerary(null));
		return new ResponseTransaction<Itinerary>(itinerary, "success", false);
		
	}

	public ResponseTransaction<Itinerary> createItinerary(RequestTransaction<User> request) {
		// TODO Auto-generated method stub
		User user = userRepo.findByUsername(request.getRequestData().getUsername());
		Itinerary itinerary = new Itinerary();
		itinerary.setUser(user);
		itinerary.setBookedDate(new Date());
		
		return new ResponseTransaction<Itinerary>(itineraryRepo.save(itinerary), "success", false);
	}


	public ResponseTransaction<Itinerary> getItineraryById(RequestTransaction<Long> requestTransaction) {
		Itinerary itinerary  = itineraryRepo.findById(requestTransaction.getRequestData());
		itinerary.getUserFlights().forEach((f) -> f.setItinerary(null));
		return new ResponseTransaction<Itinerary>(itinerary, "success", false);
	}
	
}
