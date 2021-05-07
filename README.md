# WOW Page

Base URL: <https://wowlink.github.io/wow-page>

|  Options  |                       Description                       |   Type    |
| :-------: | :-----------------------------------------------------: | :-------: |
|   `wow`   |                   The target WOW link                   | `string`  |
| `gh_user` |  The username of GitHub account to fetch link mapping   | `string`  |
| `gh_repo` | The name of the GitHub repository to fetch link mapping | `string`  |
|   `dev`   |     If the site should print debugging information      | `boolean` |

For example, setting the following URL as a search engine:

```
https://wowlink.github.io/wow-page?gh_user=wowlink&gh_repo=default-profile&wow=%s
```