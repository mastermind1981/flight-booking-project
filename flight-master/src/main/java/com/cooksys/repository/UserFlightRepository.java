package com.cooksys.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cooksys.entity.Itinerary;
import com.cooksys.entity.Location;
import com.cooksys.entity.User;
import com.cooksys.entity.UserFlight;

@Repository
public interface UserFlightRepository extends JpaRepository<UserFlight, Long> {

	List <UserFlight> findByUser(User user);
	
	List <UserFlight> findByOrigin(Location location);
	
	List <UserFlight> findByDestination(Location location);
	
	List <UserFlight> findByItinerary(Itinerary itinerary);
	
}