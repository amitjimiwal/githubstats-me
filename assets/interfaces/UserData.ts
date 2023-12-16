interface User{
     name:string,
     avatarUrl:string,
}
export interface UserSuccessStats{
     user:User,
     totalContributions:number,
     totalPR:number,
     mostActiveMonth:string,
     totalRepo:number,
     totalCommits:number,
     contributionsByMonth:{ [month: string]: number },
}
interface UserErrorStats{
     user:null,
     message:string,
}
export type UserStats= UserSuccessStats | UserErrorStats;