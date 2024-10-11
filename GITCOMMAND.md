## to check the status
```git status```

## to add files
```git add .```

## to commit
```git commit -m "message"```

## see branches
```git branch```

## to see remote
```git remote -v```

## to push
```git push <remote> <branch>```

## In case your local repo is outdate with commits from the remote then fetch the changes, then merge resolve conflicts 
```git fetch```
## then
```git merge```

## to create branch
```git branch <name>```

## to delete branch
```git branch -d <name>```

## to check your config on git 
```git config --list```

## The moment I will clone repos it will promt and ask
## creadentals so we will to enter again and again
## to check if your creadentials is stored or not use this command
```git config --global credential.helper store```
## if outcome is
```store```this means that your credentials are stored permanently in plain text on your machine.
```cache```this means your credentials are cached temporarily.
```manager```it means you're using the Git Credential Manager, which securely stores your credentials.

## Cloning using SSH key you need to generate a ssh key
```ssh-keygen -t rsa -b 4096 -C "gUxhA@example.com"```

sudo apt update
sudo apt install unzip
