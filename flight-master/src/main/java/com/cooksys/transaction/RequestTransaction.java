package com.cooksys.transaction;

public class RequestTransaction <T> {
	
	private T data;
	
	public RequestTransaction() {
		super();
		// TODO Auto-generated constructor stub
	}

	public RequestTransaction(T requestData) {
		super();
		this.data = requestData;
		
	}

	public void setRequestData(T data){
		this.data = data;
	}
	
	public T getRequestData(){
		return data;
	}
	
}
