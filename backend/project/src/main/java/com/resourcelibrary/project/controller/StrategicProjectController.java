package com.resourcelibrary.project.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.resourcelibrary.project.entity.Project;
import com.resourcelibrary.project.repository.ProjectRepository;

@RestController
@RequestMapping("/project")
public class StrategicProjectController {
      @Autowired
    public ProjectRepository projectRepository;

    @GetMapping("/test")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
    public String test()
    {
        String a = "migos";
        return "Release the dragonhawks " + a + " :O";
    }


    @PostMapping("/create")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
    public Project save(@RequestBody Project project) {

        
        try {
            System.out.println(project.toJSONString());
            return projectRepository.save(project);
        } catch (Exception e) {

            System.out.println(e.getMessage());
            return null;
        }

    }

    @PutMapping("/{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
    public String update(@PathVariable(value = "id") String id, @RequestBody Project project) {
        return projectRepository.update(id, project);

    }

    @GetMapping
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
    public List<Project> findAll() {

        try {
            System.out.println("-------->>> Get all projects  ");
        List<Project> projects =  projectRepository.findAll();
        /* List<String> response = new ArrayList<String>();
        for(Project project : projects){
            response.add(project.toJSONString());
        } */

        return projects;
 
        } catch (Exception e) {
            return null;
        }
        
 
    }
    
    

    @GetMapping("/{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
    public Project findById(@PathVariable(value = "id") String id) {

        return projectRepository.findById(id);
    }

    @DeleteMapping("/{id}")
    @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
    public String deleteById(@PathVariable(value = "id") String id) {

        try {
            projectRepository.delete(id);
            return "DELETED";
        } catch (Exception e) {
            return null;
        }
        
    }
}
