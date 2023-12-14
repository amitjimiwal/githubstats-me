import {
     ApolloClient,
     InMemoryCache,
     createHttpLink,
     gql,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { data } from '@/assets/constant.json'
export async function getAllData(name: string) {
     // const httpLink = createHttpLink({
     //      uri: "https://api.github.com/graphql",
     // });
     // const authLink = setContext((_, { headers }) => {
     //      return {
     //           headers: {
     //                ...headers,
     //                authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
     //           },
     //      };
     // });
     // const client = new ApolloClient({
     //      link: authLink.concat(httpLink),
     //      cache: new InMemoryCache(),
     // });
     // const { data } = await client.query({
     //      query:gql
     //      `query {}`,
     //  });
     const { contributionsCollection, repositories: { edges } } = data.user;

     const contributionDays = data.user.contributionsCollection.contributionCalendar.weeks.flatMap((week: any) =>
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

     const sortedRepositories = edges.sort((a, b) => b.node.stargazers.totalCount - a.node.stargazers.totalCount);
     const top5Repositories = sortedRepositories.slice(0, 5);
     const totalPR = contributionsCollection.totalPullRequestContributions;
     const totalIssue = contributionsCollection.totalIssueContributions;
     const totalcontributions = contributionsCollection.contributionCalendar.totalContributions;
     return {
          totalcontributions,
          top5Repositories,
          totalIssue,
          totalPR,
          mostActiveMonth
     };
}
