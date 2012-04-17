package org.ubikee.tengo.core;

public interface Person {

	Contract contracts(ServiceProvider provider);

	void owns(Good house1);

	boolean isOwner(Good house1);

}
