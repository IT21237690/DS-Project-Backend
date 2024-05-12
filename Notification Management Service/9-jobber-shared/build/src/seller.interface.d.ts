/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { ObjectId } from "mongoose";
import { IRatingCategories } from "./review.interface";
export type SellerType = string | string[] | number | IRatingCategories | Date | IExperience | IExperience[] | IEducation | IEducation[] | ICertificate | ICertificate[] | ILanguage | ILanguage[] | unknown | undefined;
export interface ILanguage {
    [key: string]: string | number | undefined;
    _id?: string;
    language: string;
    level: string;
}
export interface IExperience {
    [key: string]: string | number | boolean | undefined;
    _id?: string;
    company: string;
    title: string;
    startDate: string;
    endDate: string;
    description: string;
    currentlyWorkingHere: boolean | undefined;
}
export interface IEducation {
    [key: string]: string | number | undefined;
    _id?: string;
    country: string;
    university: string;
    title: string;
    major: string;
    year: string;
}
export interface ICertificate {
    [key: string]: string | number | undefined;
    _id?: string;
    name: string;
    from: string;
    year: number | string;
}
export interface ISellerDocument extends Record<string, SellerType> {
    _id?: string | ObjectId;
    profilePublicId?: string;
    fullName: string;
    username?: string;
    email?: string;
    profilePicture?: string;
    description: string;
    country: string;
    oneliner: string;
    skills: string[];
    ratingsCount?: number;
    ratingSum?: number;
    ratingCategories?: IRatingCategories;
    languages: ILanguage[];
    responseTime: number;
    recentDelivery?: Date | string;
    experience: IExperience[];
    education: IEducation[];
    socialLinks: string[];
    certificates: ICertificate[];
    ongoingJobs?: number;
    completedJobs?: number;
    cancelledJobs?: number;
    totalEarnings?: number;
    totalGigs?: number;
    paypal?: string;
    createdAt?: Date | string;
}
