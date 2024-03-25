package com.jsjds.backend.controller;

import com.alibaba.fastjson.JSONObject;
import com.jsjds.backend.service.ExampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class ExampleController {
    @Autowired
    ExampleService exampleService;

    @RequestMapping("/api/example/")
    JSONObject example(@RequestParam Map<String,String> data){
        return exampleService.example(data);
    }
}
