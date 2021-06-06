import { IGitRepository } from "./git-repositories/reducer";
import { IPaginationInfo } from "./pagination/reducer";

export interface IAppState extends IGitRepository, IPaginationInfo {}