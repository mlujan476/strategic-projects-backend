package com.resourcelibrary.project.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.resourcelibrary.project.entity.Project;

@Repository
public class ProjectRepository {
    public ProjectRepository(){

    }

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

     public Project save(Project project)
    {
       
        dynamoDBMapper.save(project);
        return project;
        
    }

    public Project findById(String id)
    {
         
        return dynamoDBMapper.load(Project.class, id);

    }

    public List<Project> findAll(){
        return dynamoDBMapper.scan(Project.class, new DynamoDBScanExpression());
    }

    public String update(String id, Project project){

        dynamoDBMapper.save(project, new DynamoDBSaveExpression().withExpectedEntry("id", new ExpectedAttributeValue(new AttributeValue().withS(id))));

        return id;
    }

    public void delete(String id){
        Project toDelete = dynamoDBMapper.load(Project.class, id);
        dynamoDBMapper.delete(toDelete);
    }
}
