export interface UserSuccessCommit {
     name:string;
     username: string;
     imageUrl: string;
     repositoryName: string;
     createdAt: string;
     commitUrl: string;
     commitMessage: string;
     commitDate: string;
     repositoryUrl:string;
     AiResponse:string;
}
interface UserErrorStats {
     username: null,
     message: string,
}
export type UserCommit = UserSuccessCommit | UserErrorStats;

