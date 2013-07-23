package org.ubikee.tengo.core.repository;

import java.util.UUID;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.ubikee.tengo.core.Contract;

public interface Contracts extends MongoRepository<Contract, UUID>  {

}
