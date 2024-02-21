import { z } from 'zod';
import { Types } from 'mongoose';

// Check if User ID is a valid MongoDB ObjectId
const ObjectIdSchema = z.string().refine(val => Types.ObjectId.isValid(val), { message: 'Invalid User ID Supplied' });

export type ObjectIdType = z.infer<typeof ObjectIdSchema>;

export default ObjectIdSchema;
