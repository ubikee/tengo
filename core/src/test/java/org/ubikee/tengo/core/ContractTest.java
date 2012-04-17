package org.ubikee.tengo.core;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.ubikee.tengo.core.neo4j.PersonNode;
import org.ubikee.tengo.core.repository.Contracts;

public class ContractTest {
	
	@Autowired Neo4jTemplate template;
	
	Person john;
	ServiceProvider jazztel;
	Service adsl;
	
	Contracts contracts;
	
	@Before
	public void before() {
		john = new PersonNode(new Long(100));
	}
	
	@Test @Transactional
	public void personShouldContract() {
		Contract contract = john.contracts(jazztel).product(adsl);
		Assert.assertNotNull(contracts.findOne(contract.reference));
	}

	@After
	public void after() {
		template.delete(john);
	}
}
