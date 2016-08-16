package com.cooksys.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cooksys.entity.Itinerary;
import com.cooksys.entity.Location;
import com.cooksys.entity.User;
import com.cooksys.entity.UserFlight;

@Repository
public interface ItineraryRepository extends JpaRepository<Itinerary, Long> {

	List<Itinerary> findByUser(User user);
	Itinerary findById(long id);
	
}