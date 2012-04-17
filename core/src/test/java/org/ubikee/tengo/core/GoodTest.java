package org.ubikee.tengo.core;

import org.junit.Assert;
import org.junit.Test;
import org.ubikee.tengo.core.Good;
import org.ubikee.tengo.core.Person;

public class GoodTest {

	Person john;
	Good house1;
	
	@Test
	public void testOwn() {
		john.owns(house1);
		Assert.assertTrue(john.isOwner(house1));
	}

}
