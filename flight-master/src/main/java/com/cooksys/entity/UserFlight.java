package com.cooksys.entity;


import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table (name = "UserFlight")
public class UserFlight {
	
	@Id
	@GeneratedValue
	private long id;
	
	@ManyToOne
	@JoinColumn (name = "user_id")
	private User user;
	
	@ManyToOne
	@JoinColumn (name = "origin_id")
	private Location origin;
	
	@ManyToOne
	@JoinColumn (name = "destination_id")
	private Location destination;
	
	@Column (name = "flight_time")
	private int flightTime;
	
	@Column (name = "off_set")
	private int offSet;
	
	@ManyToOne
	@JoinColumn (name = "itinerary_id")
	private Itinerary itinerary;
	
	public UserFlight() {
		super();
		// TODO Auto-generated constructor stub
	}

	

	public UserFlight(long id, User user, Location origin, Location destination, int flightTime, int offSet,
			Itinerary itinerary) {
		super();
		this.id = id;
		this.user = user;
		this.origin = origin;
		this.destination = destination;
		this.flightTime = flightTime;
		this.offSet = offSet;
		this.itinerary = itinerary;
	}



	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Location getOrigin() {
		return origin;
	}

	public void setOrigin(Location origin) {
		this.origin = origin;
	}

	public Location getDestination() {
		return destination;
	}

	public void setDestination(Location destination) {
		this.destination = destination;
	}

	public int getFlightTime() {
		return flightTime;
	}

	public void setFlightTime(int flightTime) {
		this.flightTime = flightTime;
	}

	public int getOffSet() {
		return offSet;
	}

	public void setOffSet(int offSet) {
		this.offSet = offSet;
	}

	public Itinerary getItinerary() {
		return itinerary;
	}

	public void setItinerary(Itinerary itinerary) {
		this.itinerary = itinerary;
	}

	
	
}
