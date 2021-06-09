export interface ScreenParams {
    name: string;
    backgroundColor: string;
    nextScreen: string;
    paddingBottom?: number;
}
  
export type MainTabsParams = {
    Home: ScreenParams;
    Guide: ScreenParams;
    Feed: ScreenParams;
    MyPage: ScreenParams;
    Board: ScreenParams;
};