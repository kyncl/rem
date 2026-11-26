# Creating Release

To create a release:

1. Specify the version with a tag (`x.y.z` format).
```bash
git tag 0.0.1
```

2. Push the tag
```bash
git push --tags
```

3. Workflow validates the build and creates the release

## Re-running release

If the release failed:

1. Fix issues from logs
2. Delete created tag
   1. On GitHub
   2. On local `git tag -d 0.0.1`
3. Re-create the tag and push it
