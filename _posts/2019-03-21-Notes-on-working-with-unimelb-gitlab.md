---
  layout: post
  title: Notes on working with unimelb gitlab
  tags:
  categories:
    - git
---

I am studying COMP30020 Computer systems, one of the unimelb core subjects for
computer science. As one of its lab tasks, working with the unimelb gitlab is pretty
straightforward by following the spec. However, some details may require our attentions
to avoid unnecessary scratches. You can find the lab spec from [here](https://www.dropbox.com/s/2pfaj1uvypk29y1/lab-3.pdf?dl=0){:target="_blank"}.

One problem that I have encountered is as following. By the way, I am using Windows
which means that situations may be different from unix-based systems.

After I created a local git project, added files to the local git repository and
commit the changes, an error occured when I tried to push the changes.

# **What I did**

I linked the remote git repository by

```bash
git remote add origin "https://gitlab.eng.unimelb.edu.au/xiandew/comp30023-lab-3"
```

It showed nothing on the command line when entered the line and seemed to be correct.
But when I tried to push changes by

```bash
git push -u origin master
```

An error jumped out

```bash
fatal: unable to update url base from redirection:
  asked for: https://gitlab.eng.unimelb.edu.au/xiandew/comp30023-lab-2/info/refs?service=git-receive-pack
   redirect: https://gitlab.eng.unimelb.edu.au/users/sign_in
```

After I read the spec again, I found that the right way to link the remote gitlab
repository should be

```bash
git remote add origin "https://gitlab.eng.unimelb.edu.au/xiandew/comp30023-lab-3.git"
```

Note `.git` at the end of line.

But when I tried to add the reomte repository again by the corrent code, It showed

```bash
fatal: remote origin already exists.
```

# **What I should have done**

After consulting the tutor and browsing the discussion forum, I got the following
solution.

If you have added a wrong remote link to a git repo, what you have to do first before
adding the correct one is removing the wrong one first by

```bash
git remote remove origin
```

After that, add the correct remote. In my case,

```bash
git remote add origin "https://gitlab.eng.unimelb.edu.au/xiandew/comp30023-lab-3.git"
```

Then use `git push -u origin master`, the error should be fixed. Note that if it
is the first time you connecting the gitlab, a window may jump out asking your
gitlab username and password.

And after that, done with the problem!
