package com.cooksys.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.entity.User;
import com.cooksys.service.UserService;
import com.cooksys.transaction.RequestTransaction;
import com.cooksys.transaction.ResponseTransaction;

@RestController
@RequestMapping("user")
public class UserController {
	@Autowired
	private UserService userService;
	
	@CrossOrigin
	@RequestMapping(value = "create", method = RequestMethod.POST)
	public ResponseTransaction<User> createUser(@RequestBody RequestTransaction<User> request){
		return userService.createUser(request);
	}
	@CrossOrigin
	@RequestMapping(value = "login", method = RequestMethod.POST)
	public ResponseTransaction<User> login(@RequestBody RequestTransaction<User> request){
		return userService.login(request);
	}
	
	
}
