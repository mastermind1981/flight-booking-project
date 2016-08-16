package com.cooksys.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cooksys.entity.Itinerary;
import com.cooksys.entity.User;
import com.cooksys.repository.ItineraryRepository;
import com.cooksys.repository.UserFlightRepository;
import com.cooksys.repository.UserRepository;
import com.cooksys.transaction.RequestTransaction;
import com.cooksys.transaction.ResponseTransaction;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepo;
	
	public ResponseTransaction<User> getUserByUsername(RequestTransaction<String> request){
		Optional<User> optUser = Optional.of(userRepo.findByUsername(request.getRequestData()));
		if(optUser.isPresent()){
			return new ResponseTransaction<User>(optUser.get(), "success", false);
		}
		
		return new ResponseTransaction<User>(null, "user not found.", true);
		
	}
	
	public ResponseTransaction<User> createUser(RequestTransaction<User> request){
		return new ResponseTransaction<User>(userRepo.save(request.getRequestData()), "user successfully created", false);
	}
	
	public ResponseTransaction<User> login(RequestTransaction<User> request){
		Optional<User> optUser = Optional.ofNullable(userRepo.findByUsername(request.getRequestData().getUsername()));
		if(optUser.isPresent()){
			User user = optUser.get();
			if(user.getPassword().equals(request.getRequestData().getPassword())){
				return new ResponseTransaction<User>(optUser.get(), "success", false);
			}else{
				return new ResponseTransaction<User>(null, "error: incorrect password", true);
			}
		}
		
		return new ResponseTransaction<User>(null, "error: user not found.", true);
		
	}
	
	
}
