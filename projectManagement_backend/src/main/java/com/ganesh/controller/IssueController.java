package com.ganesh.controller;

import com.ganesh.DTO.IssueDTO;
import com.ganesh.model.Issue;
import com.ganesh.model.User;
import com.ganesh.request.IssueRequest;
import com.ganesh.response.AuthResponse;
import com.ganesh.response.MessageResponse;
import com.ganesh.service.IssueService;
import com.ganesh.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    @Autowired
    private IssueService issueService;
    @Autowired
    private UserService userService;

    @GetMapping("/{issueId}")
    public ResponseEntity<Issue>getIssueById(@PathVariable Long issueId)throws Exception{
        return ResponseEntity.ok(issueService.getIssueById(issueId));
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Issue>>getIssueByProjectId(@PathVariable Long projectId)
            throws Exception{
        return ResponseEntity.ok(issueService.getIssueByProjectId(projectId));
    }

    @PostMapping
    public ResponseEntity<IssueDTO>createIssue(@RequestBody IssueRequest issue,
                                               @RequestHeader("Authorization")String token)
        throws Exception{
        User tokenUSer = userService.findUserProfileByJwt(token);
        User user = userService.findUserById(tokenUSer.getId());

            Issue createdIssue = issueService.createIssue(issue,tokenUSer);
            IssueDTO issueDTO = new IssueDTO();
            issueDTO.setDescription(createdIssue.getDescription());
            issueDTO.setDueDate(createdIssue.getDueDate());
            issueDTO.setId(createdIssue.getId());
            issueDTO.setPriority(createdIssue.getPriority());
            issueDTO.setProject(createdIssue.getProject());
            issueDTO.setProjectID(createdIssue.getProjectID());
            issueDTO.setStatus(createdIssue.getStatus());
            issueDTO.setTitle(createdIssue.getTitle());
            issueDTO.setTags(createdIssue.getTags());
            issueDTO.setAssignee(createdIssue.getAssignee());

            return ResponseEntity.ok(issueDTO);

    }

    @DeleteMapping("/{issueId}")
    public ResponseEntity<MessageResponse> deleteIssue(@PathVariable Long issueId,
                                                    @RequestHeader("Authorization")String token)
        throws Exception{
        User user = userService.findUserProfileByJwt(token);
        issueService.deleteIssue(issueId,user.getId());

        MessageResponse res=new MessageResponse();
        res.setMessage("Issue deleted");
        return ResponseEntity.ok(res);

    }

    @PutMapping("/{issueId}/assignee/{userId}")
    public ResponseEntity<Issue> addUserToIssue(@PathVariable Long issueId,
                                                @PathVariable Long userId)
        throws Exception{
        Issue issue = issueService.addUserToIssue(issueId,userId);
        return ResponseEntity.ok(issue);
    }

    @PutMapping("/{issueId}/status/{status}")
    public ResponseEntity<Issue>updateIssueStatus(
            @PathVariable String status,
            @PathVariable Long issueId) throws Exception{
        Issue issue = issueService.updateStatus(issueId,status);
        return ResponseEntity.ok(issue);
    }


}
