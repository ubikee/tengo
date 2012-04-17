package org.ubikee.tengo.core;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public class Contract {

	UUID reference;
	
	Person holder;
	
	Good covered;
	
	ServiceProvider provider;
	
	Service service;
	
	Expense expense;
	
	Date start;
	
	Date end;
	
	List<Clause> clauses;

	/**
	 * 
	 * @param holder
	 * @param provider
	 */
	Contract(Person holder, ServiceProvider provider) {
		
		// validar parametros
		
		this.holder = holder;
		this.provider = provider;
	}
	
	/**
	 * 
	 * @param service
	 * @return
	 */
	public Contract product(Service service) {
		// @NotNull @Provider
		this.service = service;
		return this;
	}
	
}
