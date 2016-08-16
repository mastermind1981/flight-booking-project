package com.cooksys.transaction;

import java.util.List;

import com.cooksys.entity.User;

public class ResponseTransaction<T> {
	
	private T data;
	private String message;
	private Boolean hasError;
	
	public ResponseTransaction() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ResponseTransaction(T data, String message, Boolean hasError) {
		super();
		this.data = data;
		this.message = message;
		this.hasError = hasError;
		// TODO Auto-generated constructor stub
	}

	public void setMessage(String message){
		this.message = message;
	}
	
	public String getMessage(){
		return this.message;
	}
	
	public void setResposeData(T data){
		this.data = data;
	}
	
	public T getResponseData(){
		return data;
	}
	
	public void setError(boolean hasError){
		this.hasError = hasError;
	}
	
	public boolean getError(){
		return hasError;
	}
	
}
