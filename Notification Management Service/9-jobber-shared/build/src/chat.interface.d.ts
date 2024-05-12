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
import mongoose, { ObjectId } from 'mongoose';
import { IOffer } from './order.interface';
import { ISellerGig } from './gig.interface';
import { ISellerDocument } from './seller.interface';
export interface IConversationDocument extends Document {
    _id: mongoose.Types.ObjectId | string;
    conversationId: string;
    senderUsername: string;
    receiverUsername: string;
}
export interface IMessageDocument {
    _id?: string | ObjectId;
    conversationId?: string;
    body?: string;
    url?: string;
    file?: string;
    fileType?: string;
    fileSize?: string;
    fileName?: string;
    gigId?: string;
    sellerId?: string;
    buyerId?: string;
    senderUsername?: string;
    senderPicture?: string;
    receiverUsername?: string;
    receiverPicture?: string;
    isRead?: boolean;
    hasOffer?: boolean;
    offer?: IOffer;
    hasConversationId?: boolean;
    createdAt?: Date | string;
}
export interface IMessageDetails {
    sender?: string;
    offerLink?: string;
    amount?: string;
    buyerUsername?: string;
    sellerUsername?: string;
    title?: string;
    description?: string;
    deliveryDays?: string;
    template?: string;
}
export interface IChatBoxProps {
    seller: IChatSellerProps;
    buyer: IChatBuyerProps;
    gigId: string;
    onClose: () => void;
}
export interface IChatSellerProps {
    _id: string;
    username: string;
    profilePicture: string;
    responseTime: number;
}
export interface IChatBuyerProps {
    _id: string;
    username: string;
    profilePicture: string;
}
export interface IChatMessageProps {
    message: IMessageDocument;
    seller?: ISellerDocument;
    gig?: ISellerGig;
}
