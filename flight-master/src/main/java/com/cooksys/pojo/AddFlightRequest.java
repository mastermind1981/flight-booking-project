package com.cooksys.pojo;

public class AddFlightRequest {
	
	private long userId;
	private String origin;
	private String destination;
	private int flightTime;
	private int offSet;
	private long itineraryId;
	
	
	
	public AddFlightRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	public AddFlightRequest(long userId, String origin, String destination, int flightTime, int offSet,
			long itineraryId) {
		super();
		this.userId = userId;
		origin = origin;
		destination = destination;
		this.flightTime = flightTime;
		this.offSet = offSet;
		this.itineraryId = itineraryId;
	}



	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public String getOrigin() {
		return origin;
	}
	public void setOrigin(String origin) {
		this.origin = origin;
	}
	public String getDestination() {
		return destination;
	}
	public void setDestination(String destination) {
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
	public long getItineraryId() {
		return itineraryId;
	}
	public void setItineraryId(long itineraryId) {
		this.itineraryId = itineraryId;
	}
	
	
	
}
