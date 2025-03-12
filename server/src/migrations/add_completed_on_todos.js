// @TODO: will implement when needed

import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { dbUri, envPath } from '../server.js'
import Todo from '../models/Todo.js';

dotenv.config({ path: envPath});

async function addNewField() {
    try {
        await mongoose.connect(dbUri);
        console.log('MongoDB connected');

        // Bulk update logic for adding a new field
        const result = await Todo.updateMany(
            { newField: { $exists: false } }, // Match documents missing the field
            { $set: { completed: false } } // Add the field with a default value
        );

        console.log(`${result.modifiedCount} documents updated.`);
    } catch (error) {
        console.error('Error performing bulk update:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}