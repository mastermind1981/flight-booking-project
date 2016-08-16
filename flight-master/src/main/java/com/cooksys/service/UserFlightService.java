package com.cooksys.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cooksys.entity.Itinerary;
import com.cooksys.entity.User;
import com.cooksys.repository.ItineraryRepository;
import com.cooksys.repository.UserFlightRepository;
import com.cooksys.transaction.RequestTransaction;
import com.cooksys.transaction.ResponseTransaction;

@Service
public class UserFlightService {
	@Autowired
	ItineraryRepository itineraryRepo;
	@Autowired
	UserFlightRepository userFlightRepo;
	
}
