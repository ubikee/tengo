package org.ubikee.tengo.core.neo4j;

import java.util.Set;

import org.neo4j.graphdb.Direction;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.GraphProperty;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.annotation.RelatedTo;
import org.ubikee.tengo.core.Contract;
import org.ubikee.tengo.core.Good;
import org.ubikee.tengo.core.Person;
import org.ubikee.tengo.core.ServiceProvider;

/**
 * @author ernesto
 *
 */
@NodeEntity
public class PersonNode implements Person {

	@GraphId
	Long id;
	
	@GraphProperty
	String name;
	
	@RelatedTo(type="OWNS", direction=Direction.OUTGOING, elementClass=Good.class)
	Set<Good> goods;
	
	/**
	 * 
	 * @param id
	 */
	public PersonNode(Long id) {
		this.id = id;
	}
	
	/**
	 * @param provider
	 * @return
	 */
	public Contract contracts(ServiceProvider provider) {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * @param house1
	 */
	public void owns(Good house1) {
		// TODO Auto-generated method stub
		
	}

	/**
	 * @param house1
	 * @return
	 */
	public boolean isOwner(Good house1) {
		// TODO Auto-generated method stub
		return false;
	}

}
