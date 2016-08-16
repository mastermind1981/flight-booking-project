package com.cooksys.entity;

import javax.persistence.Column;
import javax.persistence.*;

@Entity
@Table (name = "User", uniqueConstraints =
@UniqueConstraint(columnNames = {"username"}))
public class User {
	
	@Id
	@GeneratedValue
	private long id;
	
	@Column(name = "username", unique = true)
	private String username;
	
	@Column(name = "password")
	private String password;

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(long id, String username, String password) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
	
}
