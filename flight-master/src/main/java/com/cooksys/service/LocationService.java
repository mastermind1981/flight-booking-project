package com.cooksys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cooksys.entity.Location;
import com.cooksys.repository.LocationRepository;
import com.cooksys.transaction.ResponseTransaction;

@Service
public class LocationService {
	
	@Autowired
	LocationRepository repo;
		
	public ResponseTransaction<List<Location>> getAll()
	{
		return new ResponseTransaction<List<Location>>(repo.findAll(), "success", false);
	}

	public ResponseTransaction<Location> get(long id) {
		
		return new ResponseTransaction<Location>(repo.findById(id), "success", false);
	}
	
	public Location get(String name) {
		return repo.findByCity(name);
	}
}
