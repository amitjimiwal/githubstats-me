import {
     ApolloClient,
     InMemoryCache,
     createHttpLink,
     gql,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import getAIReply from "./geminiconfig";
export async function getAllData(username: string) {
     const httpLink = createHttpLink({
          uri: "https://api.github.com/graphql",
     });
     const authLink = setContext((_, { headers }) => {
          return {
               headers: {
                    ...headers,
                    authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
               },
          };
     });
     const client = new ApolloClient({
          link: authLink.concat(httpLink),
          cache: new InMemoryCache(),
     });
     try {
          const { data } = await client.query({
               query: gql`
            query GetUser($username: String!) {
              user(login: $username) {
                url
                name
                avatarUrl
                repositories(first: 100, orderBy: { field: CREATED_AT, direction: DESC }, ownerAffiliations: OWNER) {
                  totalCount
                  edges {
                    node {
                      name
                      description
                      url
                      primaryLanguage {
                        name
                      }
                      languages(first: 20) {
                        edges {
                          size
                          node {
                            name
                          }
                        }
                      }
                      defaultBranchRef {
                        target {
                          ... on Commit {
                            history {
                              totalCount
                            }
                          }
                        }
                      }
                      createdAt
                    }
                  }
                }
                contributionsCollection(from: "2023-01-01T00:00:00Z", to: "2023-12-31T23:59:59Z") {
                  totalCommitContributions
                  totalIssueContributions
                  totalPullRequestContributions
                  totalPullRequestReviewContributions
                  contributionCalendar {
                    totalContributions
                    weeks {
                      contributionDays {
                        date
                        contributionCount
                      }
                    }
                  }
                }
              }
            }
          `,
               variables: {
                    username: username,
               },
          });
          const { contributionsCollection, repositories, avatarUrl, name } = data.user;

          const contributionDays = contributionsCollection.contributionCalendar.weeks.flatMap((week: any) =>
               week.contributionDays.map((day: any) => ({
                    date: day.date,
                    contributionCount: day.contributionCount,
               }))
          );
          // Group contribution data by month
          const contributionsByMonth: { [month: string]: number } = {};
          contributionDays.forEach((day: any) => {
               const month = day.date.slice(0, 7);
               if (contributionsByMonth[month]) {
                    contributionsByMonth[month] += day.contributionCount;
               } else {
                    contributionsByMonth[month] = day.contributionCount;
               }
          });
          let mostActiveMonth = '';
          let maxContributions = 0;
          for (const month in contributionsByMonth) {
               if (contributionsByMonth[month] > maxContributions) {
                    mostActiveMonth = month;
                    maxContributions = contributionsByMonth[month];
               }
          }
          mostActiveMonth = Object.keys(contributionsByMonth).reduce((a, b) =>
               contributionsByMonth[a] > contributionsByMonth[b] ? a : b
          );
          const totalRepo = repositories.totalCount;
          const totalPR = contributionsCollection.totalPullRequestContributions;
          const totalContributions = contributionsCollection.contributionCalendar.totalContributions;
          const totalCommits = contributionsCollection.totalCommitContributions;
          return {
               user: {
                    name,
                    avatarUrl,
               },
               totalContributions,
               totalPR,
               mostActiveMonth,
               totalRepo,
               totalCommits,
               contributionsByMonth,
          };
     }
     catch (e) {
          return {
               user: null,
               message: "User not found"
          }
     }
}

export async function getFirstCommit(user: string) {
     const httpLink = createHttpLink({
          uri: "https://api.github.com/graphql",
     });
     const authLink = setContext((_, { headers }) => {
          return {
               headers: {
                    ...headers,
                    authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
               },
          };
     });
     const client = new ApolloClient({
          link: authLink.concat(httpLink),
          cache: new InMemoryCache(),
     });
     try {
          const { data } = await client.query({
               query: gql`
               query getCommit($user: String!) {
                user(login: $user) {
                  avatarUrl
                  name
                  repositories(first: 1, orderBy: { field: CREATED_AT, direction: ASC }) {
                    nodes {
                      name
                      createdAt
                      url
                      nameWithOwner
                      defaultBranchRef {
                        target {
                          ... on Commit {
                            history(first: 1) {
                              nodes {
                                url
                                messageHeadline
                                committedDate
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }              
                  `,
               variables: {
                    user: user,
               },
          });
          const response = data.user;
          const name = response.name;
          const username = user;
          const imageUrl = response.avatarUrl;
          const repositoryUrl = response.repositories.nodes[0].url;
          const totalCommits = response.repositories.nodes[0].defaultBranchRef.target.history.nodes.length;
          const repositoryName = response.repositories.nodes[0].name;
          const createdAt = response.repositories.nodes[0].createdAt;
          const commitUrl = response.repositories.nodes[0].defaultBranchRef.target.history.nodes[totalCommits - 1].url;
          const commitMessage = response.repositories.nodes[0].defaultBranchRef.target.history.nodes[totalCommits - 1].messageHeadline;
          const AiResponse= await getAIReply(commitMessage);
          const commitDate = response.repositories.nodes[0].defaultBranchRef.target.history.nodes[totalCommits - 1].committedDate;
          return {
               name, username, imageUrl, repositoryName, createdAt, commitUrl, commitMessage, commitDate,repositoryUrl,AiResponse
          };
     }
     catch (e) {
      console.log(e);
          return {
               username: null,
               message: "User not found"
          }
     }

}
