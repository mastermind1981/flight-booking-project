package com.cooksys.entity;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table (name = "Itinerary")
public class Itinerary {
	
	@Id
	@GeneratedValue
	private long id;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@Column(name = "bookedDate")
	private Date bookedDate;
	
	@OneToMany(fetch=FetchType.LAZY, mappedBy="itinerary")
	private Set<UserFlight> userFlights;
	
	
	public Itinerary() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Itinerary(long id, User user, Date bookedDate) {
		super();
		this.id = id;
		this.user = user;
		this.bookedDate = bookedDate;
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

	public Date getBookedDate() {
		return bookedDate;
	}

	public void setBookedDate(Date bookedDate) {
		this.bookedDate = bookedDate;
	}

	public Set<UserFlight> getUserFlights() {
		return userFlights;
	}

	public void setUserFlights(Set<UserFlight> userFlights) {
		this.userFlights = userFlights;
	}
	
	
	
	
}
